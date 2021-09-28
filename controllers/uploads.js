const { uploadFile: uploadFiles } = require('../helpers');

const {User, Product} = require('../models')

const uploadFile = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) return res.status(400).json({
      msg: 'No files were uploaded.'
    });

    try{
        const name = await uploadFiles(req.files, undefined, 'imgs');
        res.json({name});

    }catch(err){
        res.status(400).json({err});
    }
};

const updateImage = async (req, res) => {
    const { collection, id } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) return res.status(400).json({msg: 'User not found'});

            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) return res.status(400).json({msg: 'Product not found'});

            break;

        default:
            return res.status(400).json({msg: 'Invalid collection'});
    }

    model.img = await uploadFiles(req.files, undefined, collection);
    await model.save();

    res.json( model );
};


module.exports = {
    uploadFile,
    updateImage
}