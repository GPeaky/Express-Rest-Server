const isAdmin  = (req, res, next) => {
    if(!req.user) return res.status(500).json({
        message: 'Attempting to verify the role, without verifying the token first'
    }); 

    const { role, name } = req.user;
    if(role !== 'ADMIN_ROLE') return res.status(401).json({
        message: `${name}: is not an administrator, is not authorized`
    })

    next();
}

const haveRole = (...roles) => {
    return (req, res, next) => {
        if(!req.user) return res.status(500).json({
            message: 'Attempting to verify the role, without verifying the token first'
        }); 
        
        if(!roles.includes(req.user.role)) return res.status(401).json({
            message: `${req.user.name}: is not authorized to perform this action`
        });
        next();
    }
}

module.exports = {
    isAdmin,
    haveRole
}