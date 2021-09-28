const { Router } = require('express');
const { check } = require('express-validator');
const { productExistById, categoryExistById } = require('../helpers/db-validators');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct  } = require('../controllers/products');
const { validate, validateJWT, isAdmin } = require("../middlewares");
const router = Router();

// Obtener todas las categorias - publico
router.get('/', getAllProducts);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom(productExistById),
    validate
], getProductById);

// Crear categoria - privada - culquier persona con token valido
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().notEmpty(),
    check('category', 'Category is required').isMongoId(),
    check('category').custom(categoryExistById),
    validate
], createProduct);

// Actualizar categoria - privada - culquier persona con token valido
router.put('/:id', [
    validateJWT,
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom(productExistById),
    validate
], updateProduct);

// Borrar una categoria - privada - Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom(productExistById),
    validate
], deleteProduct)




module.exports = router; 