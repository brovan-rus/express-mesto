const userRoutes = require('express').Router();

const {
  getAllUsers,
  findUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/', getAllUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:id', findUser);
userRoutes.patch('/me', updateProfile);
userRoutes.patch('/me/avatar', updateAvatar);

module.exports = userRoutes;
