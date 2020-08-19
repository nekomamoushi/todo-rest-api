const Todo = require('../models/todo');

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
  const todo = res.locals.todo;
  res.status(200).json({ message: 'Todo found!', todo: todo });
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
  const todo = res.locals.todo;
  const title = req.body.title;
  const done = req.body.done;

  todo.title = title;
  todo.done = done;

  todo
    .save()
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

  Todo.deleteOne({ _id: todoId })
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
