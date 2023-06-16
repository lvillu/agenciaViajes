const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

function authentication(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader?.startsWith('Bearer')){

        const token = authHeader.split(' ')[1];

        jwt.verify(token,
            process.env.ACCESS_TOKEN_SECRET, 
            async (err, decoded) => {
                if(err){
                    req.user = {}
                    return next()
                }
                const user = await UserModel.findById(decoded._id).select({ password: 0, refreshToken: 0 }).exec();

                if(user)
                    req.user = user.toObject({ getters: true })
                else
                    req.user = {}

                return next()
                
        })

    } else {
        req.user ={}
        return next()
    }
}

module.exports = authentication