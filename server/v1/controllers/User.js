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

        const match = await bcrypt.match(data.password, body.password)

        if (!match)
        return res.status(401).send({
            success: true,
            data: {},
            message: "Email o correo es incorrecto"
        });

    } catch (err) {

    }
};

const logout = async (req, res, next) => {

};

const refresh = async (req, res, next) => {

};

const user = async (req, res, next) => {

};


module.exports = {
    register,
    login,
    logout,
    refresh,
    user
};