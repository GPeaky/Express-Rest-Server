const { Category } = require('../models');

// Obtener categorias - Paginado - total - populate
const getCategories = async (req, res) => {
    const { limit = 5, init = 0 } = req.query;
    const filter = {status: true};

    const [totalCategories, categories] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
            .populate('user', 'name')
            .skip(Number(init))
            .limit(Number(limit))
    ])

    res.json({
        totalCategories,
        categories
    })
}

// Obtener Categoria - populate {}
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json(category)
};

// Crear Categoria
const createCategory = async (req, res) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name })

    if (categoryDB) return res.status(400).json({
        message: `Category: ${categoryDB.name} already exists`
    })

    const category = new Category({
        name,
        user: req.user._id
    })

    await category.save();

    res.status(201).json(category)
};

// Actualizar Categoria
const updateCategory = async (req, res) => {
    const { id } = req.params;
    let { name } = req.body;
    name = name.toUpperCase();

    const category = await Category.findByIdAndUpdate(id, {name}, {new: true});

    res.json(category)
};

// Borrar Categoria - status : false
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

    res.status(200).json( category );
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};