const express = require('express');

const todosCtrl = require('../controllers/todos');

const router = express.Router();

router.get('/', todosCtrl.getTodos);

module.exports = router;
