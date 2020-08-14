const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URI = `mongodb+srv://${MONGODB_HOST}:${MONGODB_PASSWORD}@cluster0.vxrfi.azure.mongodb.net/todos?retryWrites=true&w=majority`;

const todosRoutes = require('./routes/todos');

const API_VERSION = '/api/v1';

const app = express();

app.use(API_VERSION + '/todos', todosRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log('Something went wrong with Mongoose');
  });

module.exports = app;
