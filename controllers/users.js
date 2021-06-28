const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

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
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => res.status(201).send({ data: user }))
        .catch(next),
    )
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { id, about } = req.body;
  User.updateOne({ _id: id }, { about }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((updatedUser) => res.status(200).send({ data: updatedUser }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { id, avatar } = req.body;
  User.updateOne({ _id: id }, { avatar }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((updatedUser) => res.status(200).send({ data: updatedUser }))
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
      res
        .status(200)
        .send(token)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
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
