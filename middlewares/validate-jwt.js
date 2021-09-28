const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res, next) => {
    const token = req.header('x-token');
    if(!token) return res.status(401).json({
        message: 'Not Authorized'
    })

    try{
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById( uid );

        if(!user) return res.status(401).json({
            message: 'Invalid Token - User Does not exist in database'
        })

        if(!user.state) return res.status(401).json({
            message: 'Invalid Token - User false'
        })

        req.user = user;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            message: 'Invalid Token'
        })
    }
};

module.exports = {
    validateJWT
};