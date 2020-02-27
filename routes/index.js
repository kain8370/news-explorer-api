const router = require('express').Router();
const cors = require('cors');
const articlesRouter = require('./articles');
const getUser = require('./users');
const createUser = require('./signup');
const login = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

router.use('/signup', cors(corsOption), createUser);
router.use('/signin', cors(corsOption), login);
router.use('/users/me', cors(corsOption), auth, getUser);
router.use('/articles', cors(corsOption), auth, articlesRouter);
router.use('/*', cors(corsOption), (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

module.exports = router;
