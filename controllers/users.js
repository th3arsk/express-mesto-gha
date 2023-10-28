const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.send({ data: user }))
        .catch(next);
    });
};

const getUsers = (_req, res, next) => {
  User.find()
    .then((user) => res.send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const renameUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { name: req.name, about: req.about })
    .orFail(new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const changeAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { avatar: req.avatar })
    .orFail(new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.status(200).cookie('jwt', token, { maxAge: 3600000, httpOnly: true }).send({ token });

      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  renameUser,
  changeAvatar,
  login,
};
