const userRoutes = require('express').Router();

const { getAllUsers, findUser, createUser } = require('../controllers/users');

userRoutes.get('/', getAllUsers);
userRoutes.post('/', createUser);
userRoutes.get('/:id', findUser);

module.exports = userRoutes;
