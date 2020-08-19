const express = require('express');

const todosCtrl = require('../controllers/todos');
const validators = require('../middlewares/validators');

const router = express.Router();

router.get('/', todosCtrl.getTodos);

router.get('/:todoId', validators.validateId, todosCtrl.getTodo);

router.post('/', validators.validateBody, todosCtrl.createTodo);

router.put('/:todoId', validators.validateIdAndBody, todosCtrl.updateToo);

router.delete('/:todoId', validators.validateId, todosCtrl.deleteTodo);

module.exports = router;
