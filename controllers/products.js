const { Product } = require('../models');

// Get all Products - Wiht pagination - Polulate
const getAllProducts = async (req, res) => {
    const { limit = 5, init = 0} = req.query;
    const filter = {status: true};

    const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
            .populate('category', 'name')
            .populate('user', 'name')
            .skip( Number(init))
            .limit(Number(limit))
    ])

    res.status(200).json({
        total, products
    })
};

// Get Product by id - Using Populate
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category', 'name').populate('user', 'name');

    res.status(200).json(product);
};


// Create Product - With Category 
const createProduct = async (req, res) => {
    const { user, status, ...body} = req.body;
    const productDB = await Product.findOne({ name : body.name });

    if (productDB) res.status(400).json({
        message: 'Product already exists'
    });

    const product = await Product.create({
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    });

    await product.save();
    
    res.status(201).json(product);
};

// Update Product - With Category
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { status, user, ...body } = req.body;

    if(body.name) body.name = body.name.toUpperCase();

    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    res.status(200).json(product);
};




// Delete Product - Status: false
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.status(200).json(product);
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};