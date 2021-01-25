const router = require('express').Router();
const NotFoundError = require('../errors/notfound-error');
const { urlNotFound } = require('../utils/error-messages');

router.use(() => {
  throw new NotFoundError(urlNotFound);
});

module.exports = router;
