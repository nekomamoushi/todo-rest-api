const { validationResult, param, body } = require('express-validator');
const Todo = require('../models/todo');
const createError = require('../helpers/error');

exports.validateId = (req, res, next) => {
  let todo;
  const validators = [
    param('todoId').custom((value) => {
      return Todo.findById(value).then((found) => {
        if (!found) {
          return Promise.reject('Todo Not Found');
        }
        todo = found;
      });
    }),
  ];

  Promise.all(validators.map((validator) => validator.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new createError('Todo Not Found', 404);
        throw error;
      }
      res.locals.todo = todo;
      next();
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.validateBody = (req, res, next) => {
  const validators = [
    body('title')
      .isString()
      .isLength({ min: 5 })
      .trim()
      .withMessage('Must be at least 5 chars long'),
    body('done')
      .isBoolean()
      .withMessage('Must be a Boolean value: true or false'),
  ];

  Promise.all(validators.map((validator) => validator.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new createError('Validation failed', 422);
        error.data = errors.array();
        throw error;
      }
      next();
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.validateIdAndBody = (req, res, next) => {
  let todo;
  const validators = [
    param('todoId').custom((value) => {
      return Todo.findById(value).then((found) => {
        if (!found) {
          return Promise.reject('Todo Not Found');
        }
        todo = found;
      });
    }),
    body('title')
      .isString()
      .isLength({ min: 5 })
      .trim()
      .withMessage('Must be at least 5 chars long'),
    body('done')
      .isBoolean()
      .withMessage('Must be a Boolean value: true or false'),
  ];

  Promise.all(validators.map((validator) => validator.run(req)))
    .then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new createError('Validation failed', 422);
        error.data = errors.array();
        console.log(error.data);
        throw error;
      }
      res.locals.todo = todo;
      next();
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
