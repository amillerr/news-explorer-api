const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { authRequired } = require('../utils/error-messages');
const { JWT_SECRET_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const { NODE_ENV = 'develop', JWT_SECRET } = process.env;

  if (!authorization && !authorization.startsWith('Bearer')) {
    next(new AuthError(authRequired));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_KEY}`);
  } catch (err) {
    next(new AuthError(authRequired));
  }
  req.user = payload;

  next();
};
