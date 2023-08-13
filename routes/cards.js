const router = require('express').Router();
const { createCard, getCards, removeCard } = require('../controllers/cards');

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards:cardId', removeCard)

module.exports = router;