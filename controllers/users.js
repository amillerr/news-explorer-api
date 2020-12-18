const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notfound-error');
const ConflictError = require('../errors/conflict-error');
const { SALT_ROUNDS, JWT_MAX_AGE, JWT_SECRET_KEY } = require('../utils/config');
const { userNotFound, userExist } = require('../utils/error-messages');

const getUser = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFound);
      }
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      User.findOne({ email })
        .then((someUser) => {
          if (!someUser) {
            User.create({
              name, email, password: hash,
            })
              .then((user) => res.send({ name: user.name, email: user.email }));
          } else {
            throw new ConflictError(userExist);
          }
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV = 'develop', JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_KEY,
        { expiresIn: JWT_MAX_AGE });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
