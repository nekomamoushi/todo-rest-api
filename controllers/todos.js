const Todo = require('../models/todo');
const createError = require('../helpers/error');

exports.getTodos = (req, res, next) => {
  Todo.find()
    .then((todos) => {
      res
        .status(200)
        .json({ message: 'Todos fetched successfully!', todos: todos });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = createError('Todo Not Found!', 404);
        throw error;
      }
      res.status(200).json({ message: 'Todo found!', todo: todo });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createTodo = (req, res, next) => {
  const title = req.body.title;
  const done = req.body.done;
  const todo = new Todo({
    title: title,
    done: done,
  });
  todo
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: 'Todo Created successfully!', todo: todo });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.updateToo = (req, res, next) => {
  const todoId = req.params.todoId;
  const title = req.body.title;
  const done = req.body.done;

  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = createError('Todo Not Found!', 404);
        throw error;
      }
      todo.title = title;
      todo.done = done;
      return todo.save();
    })
    .then((result) => {
      res.status(200).json({ message: 'Todo Updated Succesfully!' });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.deleteTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        const error = createError('Todo Not Found!', 404);
        throw error;
      }
      return Todo.deleteOne({ _id: todoId });
    })
    .then((result) => {
      res.status(200).json({ message: 'Todo Deleted Succesfully!' });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
