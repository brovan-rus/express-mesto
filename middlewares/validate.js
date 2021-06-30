const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const ValidationError = require('../errors/ValidationError');

const validateEmptyBodyRequest = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateCreateCardRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .regex(/[\wа-яё]/i)
      .required(),
    link: Joi.string().uri().required(),
  }),
});

const validateMongoIdParams = (req, res, next) => {
  const id = req.params.id ? req.params.id : req.params.cardId;
  if (!(validator.isMongoId(id) && id)) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateUpdateProfileRequest = celebrate({
  body: Joi.object().keys({
    body: Joi.object().keys({
      about: Joi.string()
        .regex(/[\wа-яё]/i)
        .required(),
    }),
  }),
});

const validateUpdateAvatarRequest = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});

const validateLoginRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(16),
  }),
});

const validateRegisterRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3).max(16),
    name: Joi.string().regex(/[\wа-яё]/i),
    avatar: Joi.string().uri(),
    about: Joi.string().regex(/[\wа-яё]/i),
  }),
});

module.exports = {
  validateEmptyBodyRequest,
  validateCreateCardRequest,
  validateMongoIdParams,
  validateUpdateProfileRequest,
  validateUpdateAvatarRequest,
  validateLoginRequest,
  validateRegisterRequest,
};
