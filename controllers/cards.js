const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((allCards) => res.status(200).send({ data: allCards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((updatedCard) => res.status(201).send({ data: updatedCard }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  // Проверка собственника карточки осуществляется методом схемы Cards, записанным его в свойстве statics
  Card.checkCardOwner(cardId, req.user)
    .then(() => Card.deleteOne({ _id: cardId }))
    .then(() => res.status(200).send({ message: `Карточка ${cardId} удалена` }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'))
    .then(() => {
      Card.updateOne(
        { _id: req.params.cardId },
        { $addToSet: { likes: req.user } },
        { new: true },
      ).then(() => {
        Card.findOne({ _id: req.params.cardId }).then((updatedCard) => {
          res.status(201).send({ data: updatedCard });
        });
      });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'))
    .then(() => {
      Card.updateOne(
        { _id: req.params.cardId },
        { $pull: { likes: req.user } },
        { new: true },
      ).then(() =>
        Card.findOne({ _id: req.params.cardId }).then((updatedCard) =>
          res.status(200).send({ data: updatedCard }),
        ),
      );
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  likeCard,
  dislikeCard,
  createCard,
  deleteCard,
};
