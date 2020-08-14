const express = require('express');

const todosCtrl = require('../controllers/todos');
const todo = require('../models/todo');

const router = express.Router();

router.get('/', todosCtrl.getTodos);

router.get('/:todoId', todosCtrl.getTodo);

router.post('/', todosCtrl.createTodo);

router.put('/:todoId', todosCtrl.updateToo);

router.delete('/:todoId', todosCtrl.deleteTodo);

module.exports = router;
