const User = require('../models/user');

const findUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.send({ data: user }))
    .catch((e) =>
      res.status(404).send({ message: `Запрашиваемый пользователь не найден, ошибка ${e}` }),
    );
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.status(200).send({ data: allUsers }))
    .catch((e) =>
      res.status(500).send({ message: `При выполнении запроса произошла ошибка ${e}` }),
    );
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: `При выполнении запроса произошла ошибка ${e}` });
    });
};

const updateProfile = (req, res) => {
  const { id, about } = req.body;
  User.updateOne({ _id: id }, { about })
    .then((updatedUser) => res.status(200).send({ data: updatedUser }))
    .catch((e) =>
      res.status(500).send({ message: `При выполнении запроса произошла ошибка ${e}` }),
    );
};

const updateAvatar = (req, res) => {
  const { id, avatar } = req.body;
  User.updateOne({ _id: id }, { avatar })
    .then((updatedUser) => res.status(200).send({ data: updatedUser }))
    .catch((e) =>
      res.status(500).send({ message: `При выполнении запроса произошла ошибка ${e}` }),
    );
};

module.exports = { findUser, getAllUsers, createUser, updateAvatar, updateProfile };
