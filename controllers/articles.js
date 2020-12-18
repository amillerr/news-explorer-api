const Article = require('../models/article');
const NotFoundError = require('../errors/notfound-error');
const RequestError = require('../errors/request-error');
const ForbiddenError = require('../errors/forbidden-error');
const { articleNotFound, invalidRequest, notPermit } = require('../utils/error-messages');
const { articleDeleted } = require('../utils/info-messages');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({
      _id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new RequestError(invalidRequest);
      }
      next(err);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(new NotFoundError(articleNotFound))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(notPermit);
      } else {
        article.remove(req.params.articleId)
          .then(() => res.status(200).send({ message: articleDeleted }));
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
