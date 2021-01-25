const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const AuthError = require('../errors/auth-error');
const {
  toShort,
  toLong,
  requiredField,
  notWhiteSpace,
  notEmail,
} = require('../utils/validation-messages');
const { invalidData } = require('../utils/error-messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, requiredField],
    minlength: [2, toShort],
    maxlength: [30, toLong],
  },
  email: {
    type: String,
    required: [true, requiredField],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: notEmail,
    },
  },
  password: {
    type: String,
    required: [true, requiredField],
    select: false,
    validate: {
      validator(password) {
        return /^\S+$/.test(password);
      },
      message: `${notWhiteSpace}`,
    },
  },
});

userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(invalidData);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(invalidData);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
