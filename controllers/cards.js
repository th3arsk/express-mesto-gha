const Card = require('../models/card');

const createCard = (req, res) => {
    const { name, link } = req.body;

    Card.create({ name, link })
    .then(card => res.status(201).send({ data: card }))
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

const getCards = (_req, res) => {
  Card.find()
    .then(card => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(card => res.status(200).send(card))
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate (
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then(like => res.status(200).send(like))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: `Ошибка ${err}` })
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    }
  })
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then(like => res.status(200).send(like))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: `Ошибка ${err}` })
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    }
  })
}

module.exports = {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard
}

