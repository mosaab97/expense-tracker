const express = require('express');
const { signup, login } = require('../controllers/users');
const { basicUserValidation, signupValidation } = require('../util/validation/userValidation');
const { validateRequest } = require('../util/validation/validateRequest');
const { body } = require('express-validator');

const router = express.Router();

router.post('/signup', basicUserValidation, body('name').isLength({min: 2}), validateRequest, signup);
router.post('/login', basicUserValidation, validateRequest, login);

module.exports = router
