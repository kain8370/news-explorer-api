const router = require('express').Router();
const cors = require('cors');
const articlesRouter = require('./articles');
const getUser = require('./users');
const createUser = require('./signup');
const login = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');


router.use('/signup', cors, createUser);
router.use('/signin', cors, login);
router.use('/users/me', cors, auth, getUser);
router.use('/articles', cors, auth, articlesRouter);
router.use('/*', cors, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

module.exports = router;
