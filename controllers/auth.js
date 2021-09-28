const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Verificar if email is valid
        if (!user) return res.status(400).json({
            message: 'User / Password are invalid - email' 
        });

        // If user is active
        if(!user.state) res.status(400).json({
            message: 'User / Password are invalid - State: False' 
       });

        // Verify if password is valid
        const isValidPassword = bcryptjs.compareSync(password, user.password);

        if (!isValidPassword) return res.status(400).json({
            message: 'User / Password are invalid - Password' 
        });

        // Generate jwt
        const token = await generateJWT( user.id );
        res.json({
            user, token
        });
    }catch(err) {
        res.status(500).json({
            msg: 'Contacte con un administrador'
        });
    }
}

const googleSigin = async (req, res) => {
    const { id_token } = req.body;

    try{
        const { name, email, img } = await googleVerify(id_token);
        let user = await User.findOne({ email });
        
        // If user doest not exists in database
        if(!user){
            user = new User({
                name,
                email,
                img,
                password: ':P',
                google: true
            })

            await user.save();
        }

        // If user in database has state === false
        if(user.state === false) return res.status(401).json({
            message: 'User / Password are invalid - State: False'
        });

        const token = await generateJWT( user.id );

        res.json({
            user, token
        })
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    login,
    googleSigin
}