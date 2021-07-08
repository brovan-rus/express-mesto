const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const DataConflictError = require('../errors/DataConflictError');

const findUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((allUsers) => res.status(200).send({ data: allUsers }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ email, about, avatar, name, password: hash })
        .then(() => res.status(201).send({ data: { name, about, avatar, email } }))
        .catch(next),
    )
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new DataConflictError('Пользователь с данным email уже существует'));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.updateOne({ _id: req.user }, { name, about }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then(() => res.status(200).send({ data: { name, about } }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.updateOne({ _id: req.user }, { avatar }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then(() => res.status(200).send({ data: avatar }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user })
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((currentUser) => res.status(200).send({ data: currentUser }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  findUser,
  getAllUsers,
  createUser,
  updateAvatar,
  updateProfile,
  login,
  getCurrentUser,
};
