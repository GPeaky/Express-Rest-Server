const { Router } = require('express');
const { check } = require('express-validator');
const { validate } = require("../middlewares/validate");
const { uploadFile, updateImage } = require("../controllers/uploads");
const { validCollection } = require("../helpers");
const router = Router();

router.post('/', uploadFile)

router.put('/:collection/:id', [
    check('id', 'Id is not valid').isMongoId(),
    check('collection').custom(c => validCollection(c, ['users', 'products'])),
    validate
], updateImage)

module.exports = router;