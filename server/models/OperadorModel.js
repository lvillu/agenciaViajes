'use strict';

const mongoose          = require('mongoose');


const operadorSchema = new mongoose.Schema({
   nombre:              {type: String},
   siglas:              {type: String},
   telefono:            {type: String},
   emailContacto:       {type: String},
   nombreContacto:      {type: String},
   activo:              {type: Boolean, default : true}
}, {timestamps: true,versionKey: false});

module.exports = mongoose.model('operador', operadorSchema);