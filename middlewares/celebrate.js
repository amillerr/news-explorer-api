const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Введена некорректная ссылка');
  }
  return value;
};

const createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(urlValidation).required(),
    image: Joi.string().custom(urlValidation).required(),
  }),
});

const deleteArticleValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }).unknown(true),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  createArticleValidation,
  deleteArticleValidation,
  loginValidation,
  registerValidation,
};
