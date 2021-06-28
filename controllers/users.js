const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleError, PropertyError } = require('../utils/utils');

const findUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => new PropertyError('Запрашиваемый пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.status(200).send({ data: allUsers }))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => handleError(err, res)),
  );
};

const updateProfile = (req, res) => {
  const { id, about } = req.body;
  User.updateOne({ _id: id }, { about }, { runValidators: true, new: true })
    .orFail(() => new PropertyError('Запрашиваемый пользователь не найден'))
    .then((updatedUser) => res.status(200).send({ data: updatedUser }))
    .catch((err) => handleError(err, res));
};

const updateAvatar = (req, res) => {
  const { id, avatar } = req.body;
  User.updateOne({ _id: id }, { avatar }, { runValidators: true, new: true })
    .orFail(() => new PropertyError('Запрашиваемый пользователь не найден'))
    .then((updatedUser) => res.status(200).send({ data: updatedUser }))
    .catch((err) => handleError(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
    })
    .catch((err) => handleError(err, res));
};

module.exports = { findUser, getAllUsers, createUser, updateAvatar, updateProfile, login };
