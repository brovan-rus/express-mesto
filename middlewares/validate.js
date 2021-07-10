const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const ValidationError = require('../errors/ValidationError');

const validateEmptyBodyRequest = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateLink = (req, res, next) => {
  const link = req.body.avatar ? req.body.avatar : req.body.link;
  if (link) {
    if (!validator.isURL(link, { require_protocol: true })) {
      throw new ValidationError('Переданы некорректные данные');
    }
  } else {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateCardCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(),
  }),
});

const validateProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateMongoIdParams = (req, res, next) => {
  const id = req.params.id ? req.params.id : req.params.cardId;
  if (!(validator.isMongoId(id) && id)) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
  }),
});

module.exports = {
  validateEmptyBodyRequest,
  validateMongoIdParams,
  validateProfileUpdate,
  validateRegister,
  validateLogin,
  validateLink,
  validateCardCreate,
};
