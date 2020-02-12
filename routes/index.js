const router = require('express').Router();
const articlesRouter = require('../routes/articles');
const getUser = require('../routes/users');
const createUser = require('../routes/signup');
const login = require('../routes/signin');
const auth = require('../middlewares/auth');

router.use('/signup', createUser);
router.use('/signin', login);
router.use('/users/me', auth, getUser);
router.use('/articles', auth, articlesRouter);

module.exports = router;
