const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const { MONGODB } = require('../../config/index');
const Todo = require('../../models/todo');

let createdTodo;

describe('Todos - CRUD', () => {
  beforeAll(async () => {
    const MONGODB_URI = `mongodb+srv://${MONGODB.USER}:${MONGODB.PASSWORD}@${MONGODB.HOST}/test?retryWrites=true&w=majority`;

    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    } catch (error) {
      throw new Error(`unable to connect to database: ${MONGODB_URI}`);
    }
  });

  afterAll(async () => {
    await Todo.deleteMany({});
    mongoose.connection.close();
  });

  test('GET - fetch all todos', async () => {
    const response = await request(app).get('/api/v1/todos').send();
    const { message, todos } = response.body;
    expect(response.statusCode).toBe(200);
    expect(message).toEqual('Todos fetched successfully!');
    expect(Array.isArray(todos)).toEqual(true);
    expect(todos.length).toBe(0);
  });

  test('POST - create todo - empty body', async () => {
    const response = await request(app).post('/api/v1/todos').send();
    const { message, data } = response.body;
    expect(response.statusCode).toBe(422);
    expect(message).toEqual('Validation failed!');
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toBe(3);
  });

  test('POST - create todo - no done', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({ title: 'wrong' });
    const { message, data } = response.body;
    expect(response.statusCode).toBe(422);
    expect(message).toEqual('Validation failed!');
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toBe(1);
    expect(data[0].msg).toBe('Must be a Boolean value: true or false');
  });

  test('POST - create todo - no title', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({ done: false });
    const { message, data } = response.body;
    expect(response.statusCode).toBe(422);
    expect(message).toEqual('Validation failed!');
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toBe(2);
    expect(data[0].msg).toBe('Must be a string');
    expect(data[1].msg).toBe('Must be at least 5 chars long');
  });

  test('POST - create todo - valid body', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({ title: 'Tests', done: false });
    const { message, todo } = response.body;
    expect(response.statusCode).toBe(201);
    expect(message).toEqual('Todo Created successfully!');
    expect(todo).toBeDefined();
    expect(todo.title).toBe('Tests');
    expect(todo.done).toBe(false);
    createdTodo = todo;
  });

  test('GET - fetch all todos', async () => {
    const response = await request(app).get('/api/v1/todos').send();
    const { message, todos } = response.body;
    expect(response.statusCode).toBe(200);
    expect(message).toEqual('Todos fetched successfully!');
    expect(Array.isArray(todos)).toEqual(true);
    expect(todos.length).toBe(1);
    expect(todos[0].title).toEqual(createdTodo.title);
    expect(todos[0].done).toEqual(createdTodo.done);
  });

  test('PUT - modify todo - wrong todoId', async () => {
    const response = await request(app).put('/api/v1/todos/bowebhfowfw').send();
    const { message, data } = response.body;
    expect(response.statusCode).toBe(422);
    expect(message).toEqual('Validation failed!');
  });

  test('PUT - modify todo - valid todoId, invalid body', async () => {
    const response = await request(app)
      .put('/api/v1/todos/' + createdTodo._id)
      .send();
    const { message, data } = response.body;
    expect(response.statusCode).toBe(422);
    expect(message).toEqual('Validation failed!');
  });

  test('PUT - modify todo - valid todoId, valid body', async () => {
    const response = await request(app)
      .put('/api/v1/todos/' + createdTodo._id)
      .send({ title: 'Updated Title', done: true });
    const { message, data } = response.body;
    expect(response.statusCode).toBe(200);
    expect(message).toEqual('Todo updated successfully!');
  });

  test('DELETE - delete todo - invalid todoId', async () => {
    const response = await request(app)
      .delete('/api/v1/todos/eofhowhefwe')
      .send();
    const { message } = response.body;
    expect(response.statusCode).toBe(404);
    expect(message).toEqual('Todo Not Found!');
  });

  test('DELETE - delete todo - valid todoId', async () => {
    const response = await request(app)
      .delete('/api/v1/todos/' + createdTodo._id)
      .send();
    const { message } = response.body;
    expect(response.statusCode).toBe(200);
    expect(message).toEqual('Todo deleted successfully!');
  });
});
