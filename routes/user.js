const userRoutes = require('express').Router();
const {
  validateEmptyBodyRequest,
  validateMongoIdParams,
  validateUpdateProfileRequest,
  validateUpdateAvatarRequest,
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
userRoutes.patch('/me', validateUpdateProfileRequest, updateProfile);
userRoutes.patch('/me/avatar', validateUpdateAvatarRequest, updateAvatar);

module.exports = userRoutes;
