'use strict';


/*      ESTAS APIS SON PARA PRUEBAS EN POSTMAN SOLAMENTE         */


const { UserModel } = require('../../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = async (req, res, next) => {
    let body = req.body;

    try {
        if (Object.keys(body).length == 0)
            return res.status(400).send({
                success: false,
                data: {},
                message: "No se esta recibiendo informacion"
            });

        let data = await UserModel.findOne({ email: body.email },
            {}).sort({ _id: 1 });

        if (!data || data.length == 0)
            return res.status(200).send({
                success: true,
                data: {},
                message: "Usuario no encontrado"
            });


        const match = await bcrypt.compare(body.password, data.password)

        if (!match)
            return res.status(401).send({
                success: true,
                data: {},
                message: "Email o password incorrecto"
            });

        const accessToken = jwt.sign(
            {
                username: data.username,
                _id: data._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '18000s'
            }
        )

        const refreshToken = jwt.sign(
            {
                username: data.username,
                _id: data._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '2d'
            }
        )

        await UserModel.findOneAndUpdate({_id : data.id}, {refreshToken : refreshToken}, {
            new: true            
        });

        //Con Postman
        res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });


        return res.status(200).send({
            success: true,
            data: {
                accessToken: accessToken
            },
            message: ""
        });

    } catch (err) {
        console.log(err)
    }
};

const logout = async (req, res, next) => {
    const cookies = req.cookies;

    if(!cookies.refresh_token) return res.sendStatus(204);

    const refreshToken = cookies.refresh_token;
    const user = await UserModel.findOne({refreshToken: refreshToken},{}).exec();

    if(!user){

        // Con Postman
        res.clearCookie("refresh_token", { httpOnly: true });
        return res.sendStatus(204);
    }

    user.refreshToken = null;
    await user.save();

    // Con Postman
    res.clearCookie("refresh_token", { httpOnly: true });
    return res.sendStatus(204);

};



module.exports = {
    login,
    logout,
};