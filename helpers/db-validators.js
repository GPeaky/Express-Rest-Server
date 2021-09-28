const { Category, User, Role, Product } = require('../models');

const isValidRole = async role => {
    const existRole = await Role.findOne({role});
    if(!existRole) throw new Error(`The rol: ${role} does not exist`);
}

const emailExist = async email => {
    const emailExists = await User.findOne({email});

    if(emailExists) throw new Error(`The email: ${email}, already exists`);
}

const existUserById = async id => {
    const userExist = await User.findById(id);

    if(!userExist) throw new Error(`The id: ${id}, doesn't exist`);
}

const categoryExistById = async id => {
    const categoryExist = await Category.findById(id);

    if(!categoryExist) throw new Error(`The id: ${id}, doesn't exist`);
};

const productExistById = async id => {
    const product = await Product.findById(id);
    if(!product) throw new Error(`The id: ${id}, doesn't exist`);
};

const validCollection = async (collection, collections = []) => {
    const include = collections.includes(collection);
    if(!include) throw new Error(`The collection: ${collection}, its not permited`);

    return true; 
}

module.exports = {
    isValidRole,
    emailExist,
    existUserById,
    categoryExistById,
    productExistById,
    validCollection
}