const express = require('express');

const todosCtrl = require('../controllers/todos');

const router = express.Router();

router.get('/', todosCtrl.getTodos);

router.post('/', todosCtrl.createTodo);

module.exports = router;
