function createError(message, httpCode) {
  const error = new Error(message);
  error.statusCode = httpCode;
  return error;
}

module.exports = createError;
