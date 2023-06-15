'use strict';

const mongoose          = require('mongoose');


const clienteSchema = new mongoose.Schema({
   nombre:              {type: String},
   apPaterno:           {type: String},
   apMaterno:           {type: String},
   telefono:            {type: String},
   direccion:           {type: String},
   email:               {type: String},
   fecNacimiento:       {type: Date},
   activo:              {type: Boolean, default : true}
}, {timestamps: true,versionKey: false});

module.exports = mongoose.model('cliente', clienteSchema);