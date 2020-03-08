const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  bcryptjs.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.send({ data: { name: user.name, email: user.email } }))
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  let _id = '';
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Неправильна почта или пароль!');
      }
      _id = user._id;
      return bcryptjs.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new BadRequestError('Неправильна почта или пароль!');
      }
      const token = jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).send({ token }).end('Все верно!');
    })
    .catch(next);
}

module.exports = {
  getUser, login, createUser,
};
