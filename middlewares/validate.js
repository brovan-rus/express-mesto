const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const validateEmptyBodyRequest = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateCreateCardRequest = (req, res, next) => {
  const { name, link } = req.body;
  if (
    !(
      Object.keys(req.body).length === 2 &&
      name &&
      link &&
      (validator.isAlphanumeric(name, 'en-US') || validator.isAlphanumeric(name, 'ru-RU')) &&
      validator.isURL(link)
    )
  ) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateMongoIdParams = (req, res, next) => {
  const id = req.params.id ? req.params.id : req.params.cardId;
  if (!validator.isMongoId(id)) {
    throw new ValidationError();
  }
  next();
};

const validateUpdateProfileRequest = (req, res, next) => {
  const { about } = req.body;
  if (
    !(
      Object.keys(req.body).length === 1 &&
      about &&
      (validator.isAlphanumeric(about, 'en-US') || validator.isAlphanumeric(about, 'ru-RU'))
    )
  ) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateUpdateAvatarRequest = (req, res, next) => {
  const { avatar } = req.body;
  if (!(Object.keys(req.body).length === 1 && avatar && validator.isURL(avatar))) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateLoginRequest = (req, res, next) => {
  const { email, password } = req.body;
  if (!(Object.keys(req.body).length === 2 && email && password)) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};

const validateRegisterRequest = (req, res, next) => {
  const { email, password, name, avatar, about } = req.body;
  if (
    !(
      (Object.keys(req.body).length > 1 && Object.keys(req.body).length < 6 && email && password) ||
      name ||
      avatar ||
      about
    )
  ) {
    throw new ValidationError('Переданы некорректные данные');
  }
  next();
};
module.exports = {
  validateEmptyBodyRequest,
  validateCreateCardRequest,
  validateMongoIdParams,
  validateUpdateProfileRequest,
  validateUpdateAvatarRequest,
  validateLoginRequest,
  validateRegisterRequest,
};
