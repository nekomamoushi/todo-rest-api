const express = require('express');
require('dotenv').config();

const todosRoutes = require('./routes/todos');

const API_VERSION = '/api/v1';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(API_VERSION + '/todos', todosRoutes);

module.exports = app;
