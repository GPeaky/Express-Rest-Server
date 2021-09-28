const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req, res) => {
    const { limit = 5, start = 0 } = req.query;
    const filter = {state: true};

    const [totalUsers, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
            .skip(Number(start))
            .limit(Number(limit))
    ])

    res.json({
        totalUsers,
        users
    })
}

const usersPut = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user)
}

const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});

    // Password hash
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in Database
    await user.save();

    res.json(user)
}

const usersPatch = (req, res) => {
    res.json({
        message: 'Patch API - Controller'
    })
}

const usersDelete = async(req, res) => {
    const { id } = req.params;

    // Database delete
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        user
    })
}


module.exports = {
    usersPost,
    usersPatch,
    usersDelete,
    usersPut,
    usersGet
}