const userRoutes = require('express').Router();

const {
  getAllUsers,
  findUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/', getAllUsers);
userRoutes.post('/', createUser);
userRoutes.get('/:id', findUser);
userRoutes.patch('/me', updateProfile);
userRoutes.patch('/me', updateAvatar);

module.exports = userRoutes;
