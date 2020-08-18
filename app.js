const express = require('express');

const { API_VERSION } = require('./config/index');
const cors = require('./middlewares/cors');
const todosRoutes = require('./routes/todos');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle CORS
app.use(cors());

// Handle todos routes
app.use(API_VERSION + '/todos', todosRoutes);

// Handle errors
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

module.exports = app;
