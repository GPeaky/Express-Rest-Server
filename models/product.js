const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        requiered: true
    },
    price: {
        type: Number,
        default: 0,   
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    },
});

ProductSchema.methods.toJSON = function(){
    const { __v, status, ...product } = this.toObject();
    return product
}

module.exports = model('Product', ProductSchema);