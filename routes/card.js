const cardRoutes = require('express').Router();
const {
  getAllCards,
  likeCard,
  dislikeCard,
  createCard,
  deleteCard,
} = require('../controllers/cards');

cardRoutes.get('/', getAllCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardRoutes;
