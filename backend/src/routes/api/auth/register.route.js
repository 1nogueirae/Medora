const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { User } = require('../../../database/models');

const userController = require('../../../controllers/user-registration.controller');
const validateUserCreation = require('../../../middleware/user-registration.middleware');

router.post(
    '/',
    validateUserCreation,
    userController.create
);

module.exports = router;