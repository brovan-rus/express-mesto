const mongoose = require('mongoose');
const { PropertyError } = require('../utils/utils');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.static.checkCardOwner = function (cardId, userId) {
  return this.findOne({ _id: cardId }).then((card) => {
    if (!card) {
      return Promise.reject(new PropertyError('Запрашиваемая карточка не найдена'));
    }
    if (!card.owner === userId) {
      return Promise.reject(new Error('Недостаточно прав для совершения действия'));
    }
    return card;
  });
};

module.exports = mongoose.model('card', cardSchema);
