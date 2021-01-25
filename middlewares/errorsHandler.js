const serverError = require('../utils/error-messages');

const errorsHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode).send({
    message: statusCode === 500
      ? serverError
      : message,
  });
  next();
};

module.exports = errorsHandler;
