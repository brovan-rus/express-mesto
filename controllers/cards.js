const Card = require('../models/card');
const { handleError, PropertyError } = require('../utils/utils');

const getAllCards = (req, res) => {
  Card.find({})
    .then((allCards) => res.status(200).send({ data: allCards }))
    .catch((err) => handleError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((updatedCard) => res.status(201).send({ data: updatedCard }))
    .catch((err) => handleError(err, res));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete({ cardId })
    .orFail(() => new PropertyError('Запрашиваемая карточка не найдена'))
    .then(() => res.status(200).send({ message: `Карточка ${cardId} удалена` }))
    .catch((err) => handleError(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new PropertyError('Запрашиваемая карточка не найдена'))
    .then(() => res.status(201).send({ message: 'Лайк поставлен' }))
    .catch((err) => handleError(err, res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new PropertyError('Запрашиваемая карточка не найдена'))
    .then(() => res.status(200).send({ message: 'Лайк удален' }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getAllCards,
  likeCard,
  dislikeCard,
  createCard,
  deleteCard,
};
