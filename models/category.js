const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
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
    }
});

CategorySchema.methods.toJSON = function(){
    const { __v, status, ...category } = this.toObject();

    return category
}

module.exports = model('Categorie', CategorySchema);