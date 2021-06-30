const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

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
    validate: {
      validator(v) {
        return /https?:\/{2}[\w\-._~:/?#[\]@!$&'()*+,;=]+/gi.test(v);
      },
    },
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

cardSchema.statics.checkCardOwner = function (cardId, userId) {
  return this.findOne({ _id: cardId }).then((card) => {
    if (!card) {
      return Promise.reject(new NotFoundError('Запрашиваемая карточка не найдена'));
    }
    if (!(card.owner.toString() === userId)) {
      return Promise.reject(new ForbiddenError('Недостаточно прав для совершения действия'));
    }
    return card;
  });
};

module.exports = mongoose.model('card', cardSchema);
