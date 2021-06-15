const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((allCards) => res.status(200).send({ data: allCards }))
    .catch((e) => res.status(500).send(`При исполнении запроса произошла ошибка ${e}`));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((updatedCard) => res.status(201).send({ data: updatedCard }))
    .catch((e) => res.status(500).send(`При исполнении запроса произошла ошибка ${e}`));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete({ cardId })
    .then(() => res.status(200).send({ message: `Карточка ${cardId} удалена` }))
    .catch((e) => res.status(500).send(`Ошибка при обработке запроса ${e}`));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(() => res.status(201).send({ message: 'Лайк поставлен' }))
    .catch((e) => req.status(500).send(`Ошибка при обработке запроса ${e}`));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(() => res.status(200).send({ message: 'Лайк удален' }))
    .catch((e) => req.status(400).send(`Ошибка при обработке запроса ${e}`));
};

module.exports = { getAllCards, likeCard, dislikeCard, createCard, deleteCard };
