'use strict';

const { UserModel } = require('../../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
    let body = req.body;

    try {

        if (Object.keys(body).length == 0)
            return res.status(400).send({
                success: false,
                data: {},
                message: "No se esta recibiendo informacion"
            });

        const usuarioExiste = await UserModel.exists({ username: body.username }).exec();

        if (usuarioExiste) return res.status(409).send({
            success: false,
            data: {},
            message: "El usuario ya existe"
        });

        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;

        let data = {} //await UserModel(body).save();
        return res.status(201).send({
            success: true,
            data: data,
            message: "Usuario insertado"
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ error: err });
    }

};

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

        const newUser = await UserModel.findOneAndUpdate({_id : data.id}, {refreshToken : refreshToken}, {
            new: true            
        });

        //Con Front End
        //res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'None', secure: true });

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
        // Con Front End
        // res.clearCookie("refresh_token", { httpOnly: true, sameSite: 'None', secure: true });

        // Con Postman
        res.clearCookie("refresh_token", { httpOnly: true });
        return res.sendStatus(204);
    }

    user.refreshToken = null;
    await user.save();

    // Con Front End
    // res.clearCookie("refresh_token", { httpOnly: true, sameSite: 'None', secure: true });

    // Con Postman
    res.clearCookie("refresh_token", { httpOnly: true });
    return res.sendStatus(204);

};

const refresh = async (req, res, next) => {
    const cookies = req.cookies;
    if(!cookies.refresh_token) return res.sendStatus(401);

    const refreshToken = cookies.refresh_token;
    const user = await UserModel.findOne({refreshToken: refreshToken},{}).exec();

    if(!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            
            if(err || user._id.toString() !== decoded._id) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {
                    username: decoded.username,
                    _id: decoded._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '18000s'
                }
            )

            return res.status(200).send({
                success: true,
                data: {
                    accessToken: accessToken
                },
                message: ""
            });
        }
    )

};

const user = async (req, res, next) => {
    const user = req.user

    return res.status(200).send({
        success: true,
        data: user,
        message: ""
    });
};


module.exports = {
    register,
    login,
    logout,
    refresh,
    user
};