const express = require('express');
const { body } = require('express-validator');

const todosCtrl = require('../controllers/todos');
const todo = require('../models/todo');

const router = express.Router();

router.get('/', todosCtrl.getTodos);

router.get('/:todoId', todosCtrl.getTodo);

router.post(
  '/',
  [
    body('title').isString().isLength({ min: 5 }).trim(),
    body('done').isBoolean(),
  ],
  todosCtrl.createTodo
);

router.put(
  '/:todoId',
  [
    body('title').isString().isLength({ min: 5 }).trim(),
    body('done').isBoolean(),
  ],
  todosCtrl.updateToo
);

router.delete('/:todoId', todosCtrl.deleteTodo);

module.exports = router;
