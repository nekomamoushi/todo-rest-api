const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const { MONGODB } = require('../../config/index');
const { expectCt } = require('helmet');

describe('Todos - GET - /api/v1/todos', () => {
  beforeAll(async () => {
    const MONGODB_URI = `mongodb+srv://${MONGODB.USER}:${MONGODB.PASSWORD}@${MONGODB.HOST}/${MONGODB.DB_NAME}?retryWrites=true&w=majority`;

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
    mongoose.connection.close();
  });

  test('GET - all todos', async () => {
    const response = await request(app).get('/api/v1/todos').send();
    expect(response.statusCode).toBe(200);
  });
});
