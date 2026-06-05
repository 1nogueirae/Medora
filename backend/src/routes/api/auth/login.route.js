const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/user-login.controller');
const validateUserLogin = require('../../../middleware/user-login.middleware');

router.post(
    '/',
    validateUserLogin,
    userController.login
);

module.exports = router;