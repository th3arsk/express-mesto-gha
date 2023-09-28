const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then(user => res.status(201).send({ data: user }))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: `Ошибка ${err}` })
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    } else {
      res.status(500).send({ message: 'Произошла ошибка' })
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    }
  });
};

const getUsers = (_req, res) => {
  return User.find()
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка ${err}` })
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Ошибка ${err}` })
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    })
};

const renameUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { name: req.name, about: req.about })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка ${err}` })
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Ошибка ${err}` })
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    })

}

const changeAvatar = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { avatar: req.avatar })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка ${err}` })
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }

      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Ошибка ${err}` })
        console.log(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    })
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  renameUser,
  changeAvatar
}
