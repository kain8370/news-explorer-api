const router = require('express').Router();
const articlesRouter = require('./articles');
const getUser = require('./users');
const createUser = require('./signup');
const login = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.use('/signup', createUser);
router.use('/signin', login);
router.use('/users/me', auth, getUser);
router.use('/articles', auth, articlesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

module.exports = router;
