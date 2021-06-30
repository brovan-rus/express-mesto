const validator = require('validator');
const ValidationError = require('../errors/ValidationError');

const validateEmptyBodyRequest = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    throw new ValidationError();
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
    throw new ValidationError();
  }
  next();
};

const validateMongoIdParams = (req, res, next) => {
  const { id } = req.params;
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
    throw new ValidationError();
  }
  next();
};

const validateUpdateAvatarRequest = (req, res, next) => {
  const { avatar } = req.body;
  if (!(Object.keys(req.body).length === 1 && avatar && validator.isURL(avatar))) {
    throw new ValidationError();
  }
  next();
};

const validateEmailPasswordRequest = (req, res, next) => {
  const { email, password } = req.body;
  if (!(Object.keys(req.body).length === 2 && email && password)) {
    throw new ValidationError();
  }
  next();
};

module.exports = {
  validateEmptyBodyRequest,
  validateCreateCardRequest,
  validateMongoIdParams,
  validateUpdateProfileRequest,
  validateUpdateAvatarRequest,
  validateEmailPasswordRequest,
};
