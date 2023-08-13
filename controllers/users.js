const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.status(201).send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

};

const getUsers = (_req, res) => {
  return User.find()
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const renameUser = (req, res) => {
  const id = req.user._id;

  return User.findById(id)
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = {
  createUser,
  getUsers,
  getUser
}
