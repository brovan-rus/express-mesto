const userRoutes = require('express').Router();
const {
  validateEmptyBodyRequest,
  validateMongoIdParams,
  validateProfileUpdate,
  validateRequiredLink,
} = require('../middlewares/validate');
const {
  getAllUsers,
  findUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/', validateEmptyBodyRequest, getAllUsers);
userRoutes.get('/me', validateEmptyBodyRequest, getCurrentUser);
userRoutes.get('/:id', validateEmptyBodyRequest, validateMongoIdParams, findUser);
userRoutes.patch('/me', validateProfileUpdate, updateProfile);
userRoutes.patch('/me/avatar', validateRequiredLink, updateAvatar);

module.exports = userRoutes;
