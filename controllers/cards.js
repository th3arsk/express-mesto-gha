const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);

  Card.create({ name, link })
  .then(card => res.status(201).send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

};

const getCards = (_req, res) => {
  Card.find()
    .then(card => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const removeCard = (req, res) => {
  User.findById(req.params.cardId)
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)

module.exports = {
  getCards,
  createCard,
  removeCard
}
