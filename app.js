const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const { NODE_ENV, API_VERSION } = require('./config/index');
const cors = require('./middlewares/cors');
const todosRoutes = require('./routes/todos');

const app = express();

app.use(helmet());
if (NODE_ENV === 'production') {
  app.use(morgan('common'));
} else {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle CORS
app.use(cors());

// Handle todos routes
app.use(API_VERSION + '/todos', todosRoutes);

// Handle errors
app.use((error, req, res, next) => {
  console.log(error.message);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

module.exports = app;
