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
  Card.deleteOne({ cardId })
    .then(() => res.status(200).send({ message: `Карточка ${cardId} удалена` }))
    .catch((e) => res.status(500).send(`Ошибка при обработке запроса ${e}`));
};

const putLike = (req, res) => {
  const userId = req.body._id;
  const { cardId } = req.params;
  Card.updateOne({ cardId }, { $addToSet: { likes: userId } })
    .then(() => res.status(201).send({ message: 'Лайк поставлен' }))
    .catch((e) => req.status(500).send(`Ошибка при обработке запроса ${e}`));
};

const deleteLike = (res, req) => {
  const userId = req.body._id;
  const { cardId } = req.params;
  Card.updateOne({ cardId }, { $pull: { likes: userId } })
    .then(() => res.status(200).send({ message: 'Лайк удален' }))
    .catch((e) => req.status(400).send(`Ошибка при обработке запроса ${e}`));
};

module.exports = { getAllCards, putLike, deleteLike, createCard, deleteCard };
