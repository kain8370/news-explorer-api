const router = require('express').Router();
const articlesRouter = require('./articles');
const getUser = require('./users');
const createUser = require('./signup');
const login = require('./signin');
const auth = require('../middlewares/auth');

router.use('/signup', createUser);
router.use('/signin', login);
router.use('/users/me', auth, getUser);
router.use('/articles', auth, articlesRouter);

module.exports = router;
