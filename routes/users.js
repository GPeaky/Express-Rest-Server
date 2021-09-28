const { Router } = require('express');
const { check } = require('express-validator');
const controller = require("../controllers/users");
const { validate, validateJWT, isAdmin, haveRole} = require('../middlewares');
const { isValidRole, emailExist, existUserById } = require('../helpers/db-validators');
const router = Router();

router.get('/', controller.usersGet);

router.put('/:id',[
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(id => existUserById(id)),
    check('role').custom( role => isValidRole(role)),
    validate
], controller.usersPut);

router.post('/', [
    check('name', 'Name is obligatory').not().isEmpty(),
    check('password', 'Password requires 8 letters or more').isLength({min: 8}),
    check('email', 'Email not valid').isEmail(),
    check('email').custom(email => emailExist(email)),
    check('role').custom( role => isValidRole(role)),
    validate
], controller.usersPost);

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    haveRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(id => existUserById(id)),
    validate
],controller.usersDelete);

router.patch('/', controller.usersPatch);

module.exports = router;