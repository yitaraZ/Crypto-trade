const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
