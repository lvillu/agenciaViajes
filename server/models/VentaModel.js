'use strict';

const mongoose          = require('mongoose');

const operadorSchema = new mongoose.Schema({
    operadorId:             { type: String },
    name:                   { type: String },
}, { timestamps: false, versionKey: false, _id: false });

const notaVentaSchema = new mongoose.Schema({
    fecha:              { type: Date },
    folio:              { type: String},
    concepto:           { type: String },
    liquidacion:        { type: Boolean, default: false},
    importe:            { type: Double },
    tipoCambio:         { type: Double },
    importeMXN:         { type: Double },
    resto:              { type: Double }
}, { timestamps: false, versionKey: false, _id: false });

const detalleVentaSchema = new mongoose.Schema({
    fechaViaje:         { type: Date},
    fechaRegreso:       { type: Date},
    horaViaje:          { type: String},
    horaRegreso:        { type: String},
    vuelosRedondos:     { type: Boolean},
    hotel:              { type: String},
    todoIncluido:       { type: Boolean},
    translados:         { type: Boolean},
}, { timestamps: false, versionKey: false, _id: false });

const ventaSchema = new mongoose.Schema({
   titular:             {type: String},
   claveReserva:        {type: String},
   telefono:            {type: String},
   email:               {type: String},
   totalVenta:          {type: Double},
   totalNeto:           {type: Double},
   fechaVenta:          {type: Date},
   fechaLimite:         {type: Date},
   ventaDlls:           {type: Boolean, default: false},
   operador:            operadorSchema,
   detalleViaje:        detalleVentaSchema,
   notasVenta:          [notaVentaSchema],
   cancelada:           {type: Boolean, default : false}
}, {timestamps: true,versionKey: false});

module.exports = mongoose.model('venta', ventaSchema);