const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');
const validCollections = [
    'roles',
    'users',
    'category',
    'products'
];

const searchUser = async ( arg, res ) => {
    const isMongoId = ObjectId.isValid(arg)

    if( isMongoId ) {
        const user = await User.findById(arg);
        return res.json({
            results: (user) ? [ user ] : []
        })
    }

    const regex = new RegExp(arg, 'i');
    const users = await User.find({
        $or: [
            {name: regex},
            {email: regex}
        ],
        $and: [{state: true}]
    });

    res.json({
        results: users
    });
};

const searchCategory = async( arg, res ) => {
    const isMongoId = ObjectId.isValid( arg ); // TRUE 

    if ( isMongoId ) {
        const category = await Category.findById(arg);
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( arg, 'i' );
    const categories = await Category.find({ nombre: regex, estado: true });

    res.json({
        results: categories
    });
}

const searchProduct = async( arg, res ) => {
    const isMongoId = ObjectId.isValid( arg ); // TRUE 

    if ( isMongoId ) {
        const product = await Product.findById(arg).populate('categoria','nombre');
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( arg, 'i' );
    const products = await Product.find({ nombre: regex, estado: true }).populate('categoria','nombre')

    res.json({
        results: products
    });
}

const search = (req, res) => {
    const { collection, term } = req.params;

    if( !validCollections.includes(collection) ) res.status(400).json({
        mesage: `${collection} is not a valid collection`
    })

    // Create a switch statement to determine which collection to search
    switch(collection) {
        case 'users':
            searchUser(term, res);
            break;
        case 'category':
            searchCategory(term, res);
            break;
        case 'products':
            searchProduct(term, res);
            break;
        default:
            res.status(500).json({
                message: `${collection} is not a valid collection`
            });
            break;
    }
}

module.exports = {
    search
}