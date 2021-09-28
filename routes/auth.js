const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSigin } = require('../controllers/auth');
const {validate} = require("../middlewares/validate");
const router = Router();

router.post('/login', [
    check('email', 'Invalid email address.').isEmail(),
    check('password', 'Invalid password.').not().isEmpty(),
    validate
], login);

router.post('/google', [
    check('id_token', 'id_token is invalid.').not().isEmpty(),
    validate
], googleSigin);

module.exports = router;