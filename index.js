const express = require('express');
require('dotenv').config();

const todosRoutes = require('./routes/todos');

const API_VERSION = '/api/v1';

const app = express();

app.use(API_VERSION + '/todos', todosRoutes);

app.listen(process.env.PORT || 3000);

module.exports = app;
