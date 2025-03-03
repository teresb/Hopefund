const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a single user by ID
router.get('/:id', userController.getUserById);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

// Route to get authenticated user info
router.get('/me', userController.getUserInfo);

module.exports = router;