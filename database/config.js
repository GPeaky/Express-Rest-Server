const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database Connection Established');
    }catch(err){
        throw new Error('cant initialize database connection');
    }
}

module.exports = {
    dbConnection
}