const cardRoutes = require('express').Router();
const {
  validateEmptyBodyRequest,
  validateMongoIdParams,
  validateRequiredLink,
  validateCardCreate,
} = require('../middlewares/validate');
const {
  getAllCards,
  likeCard,
  dislikeCard,
  createCard,
  deleteCard,
} = require('../controllers/cards');

cardRoutes.get('/', validateEmptyBodyRequest, getAllCards);
cardRoutes.post('/', validateCardCreate, validateRequiredLink, createCard);
cardRoutes.delete('/:cardId', validateEmptyBodyRequest, validateMongoIdParams, deleteCard);
cardRoutes.put('/:cardId/likes', validateEmptyBodyRequest, validateMongoIdParams, likeCard);
cardRoutes.delete('/:cardId/likes', validateEmptyBodyRequest, validateMongoIdParams, dislikeCard);

module.exports = cardRoutes;
