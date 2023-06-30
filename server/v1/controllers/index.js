'use strict';

const Cliente           = require('./Cliente');
const Operador          = require('./Operador');
const User              = require('./User');
const UsuarioPruebas    = require('./UsuarioPruebas');

module.exports = {
    ClienteCtrl: Cliente,
    OperadorCtrl: Operador,
    UserCtrl: User,
    UsuarioPruebasCtrl: UsuarioPruebas
}