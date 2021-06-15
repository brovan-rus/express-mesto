const cardRoutes = require('express').Router();
const {
  getAllCards,
  putLike,
  deleteLike,
  createCard,
  deleteCard,
} = require('../controllers/cards');

cardRoutes.get('/', getAllCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', putLike);
cardRoutes.delete('/:cardId/likes', deleteLike);

module.exports = cardRoutes;
