const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { createArticleValidation, deleteArticleValidation } = require('../middlewares/celebrate');

router.get('/articles', getArticles);
router.post('/articles', createArticleValidation, createArticle);
router.delete('/articles/:articleId', deleteArticleValidation, deleteArticle);

module.exports = router;
