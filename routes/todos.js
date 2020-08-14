const express = require('express');

const todosCtrl = require('../controllers/todos');

const router = express.Router();

router.get('/', todosCtrl.getTodos);

router.get('/:todoId', todosCtrl.getTodo);

router.post('/', todosCtrl.createTodo);

router.put('/:todoId', todosCtrl.updateToo);

module.exports = router;
