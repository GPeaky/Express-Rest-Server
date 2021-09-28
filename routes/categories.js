const { Router } = require('express');
const { check } = require('express-validator');
const { categoryExistById } = require('../helpers/db-validators');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categories');
const { validate, validateJWT, isAdmin } = require("../middlewares");
const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom(categoryExistById),
    validate
], getCategoryById);

// Crear categoria - privada - culquier persona con token valido
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().notEmpty(),
    validate
], createCategory);

// Actualizar categoria - privada - culquier persona con token valido
router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().notEmpty(),
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom(categoryExistById),
    validate
], updateCategory);

// Borrar una categoria - privada - Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom(categoryExistById),
    validate
], deleteCategory)




module.exports = router;