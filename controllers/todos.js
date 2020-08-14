const todo = require('../models/todo');

const Todo = require('../models/todo');

exports.getTodos = (req, res, next) => {
  Todo.find()
    .then((todos) => {
      if (!todos) {
        return res.status(404).json({ message: 'No Todos Found!' });
      }
      res
        .status(200)
        .json({ message: 'Todos fetched successfully!', todos: todos });
    })
    .catch((error) => {
      console.log('Something went wrong');
      console.log(error);
    });
};

exports.getTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.findById(todoId)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: 'Todo Not Found!' });
      }
      res.status(200).json({ message: 'Todo found!', todo: todo });
    })
    .catch((error) => {
      console.log('Something went wrong');
      console.log(error);
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
      console.log('Something went wrong');
      console.log(error);
    });
};
