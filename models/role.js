const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    role:{
        type: String,
        required: [true, 'rol its required']
    }
})

module.exports = model('Role', RolSchema)