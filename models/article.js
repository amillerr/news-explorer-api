const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { requiredField, notUrl } = require('../utils/validation-messages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, requiredField],
  },
  title: {
    type: String,
    required: [true, requiredField],
  },
  text: {
    type: String,
    required: [true, requiredField],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, requiredField],
  },
  source: {
    type: String,
    required: [true, requiredField],
  },
  link: {
    type: String,
    required: [true, requiredField],
    validate: {
      validator: (v) => isURL(v),
      message: notUrl,
    },
  },
  image: {
    type: String,
    required: [true, requiredField],
    validate: {
      validator: (v) => isURL(v),
      message: notUrl,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, requiredField],
  },

});

module.exports = mongoose.model('article', articleSchema);
