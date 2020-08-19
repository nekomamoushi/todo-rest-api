const Todo = require('../models/todo');

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res
      .status(200)
      .json({ message: 'Todos fetched successfully!', todos: todos });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getTodo = (req, res, next) => {
  const todo = res.locals.todo;
  res.status(200).json({ message: 'Todo found!', todo: todo });
};

exports.createTodo = async (req, res, next) => {
  const title = req.body.title;
  const done = req.body.done;

  const todo = new Todo({
    title: title,
    done: done,
  });

  try {
    await todo.save();
    res.status(201).json({ message: 'Todo Created successfully!', todo: todo });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateToo = async (req, res, next) => {
  const todo = res.locals.todo;
  const title = req.body.title;
  const done = req.body.done;

  todo.title = title;
  todo.done = done;

  try {
    await todo.save();
    res.status(200).json({ message: 'Todo Updated Succesfully!' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const todoId = req.params.todoId;
  try {
    await Todo.deleteOne({ _id: todoId });
    res.status(200).json({ message: 'Todo Deleted Succesfully!' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
