const router = require('express').Router();
const auth = require('../middlewares/auth');
const articleRoutes = require('./articles');
const userRoutes = require('./users');
const { createUser, login } = require('../controllers/users');
const { loginValidation, registerValidation } = require('../middlewares/celebrate');
const error = require('./error');

router.post('/signup', registerValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.use('/', articleRoutes);
router.use('/', userRoutes);
router.use('*', error);

module.exports = router;
