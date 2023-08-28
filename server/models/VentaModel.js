'use strict';

const mongoose          = require('mongoose');

const operadorSchema = new mongoose.Schema({
    operadorId:             { type: String },
    nombre:                 { type: String },
}, { timestamps: false, versionKey: false, _id: false });

const notaVentaSchema = new mongoose.Schema({
    fecha:              { type: Date },
    folio:              { type: String},
    concepto:           { type: String },
    importe:            { type: Number },
    tipoCambio:         { type: Number, default: 1 },
    importeMXN:         { type: Number },
    tipoPago:           {type: String, enum: ["Anticipo", "Abono", "Liquidacion"]},
    resto:              { type: Number }
}, { timestamps: false, versionKey: false });

const hoursSchema = new mongoose.Schema({
    hours:         { type: Number },
    minutes:              { type: Number }
}, { timestamps: false, versionKey: false, _id: false });

const detalleViajeSchema = new mongoose.Schema({
    fechaViaje:         { type: Date},
    fechaRegreso:       { type: Date},
    horaViaje:          hoursSchema,
    horaRegreso:        hoursSchema,
    vuelosRedondos:     { type: Boolean},
    hotel:              { type: String},
    destino:            { type: String},
    descripcionViaje:   { type: String},
    todoIncluido:       { type: Boolean},
    traslados:          { type: Boolean},
}, { timestamps: false, versionKey: false, _id: false });

const ventaSchema = new mongoose.Schema({
   titular:             {type: String},
   claveReserva:        {type: String},
   telefono:            {type: String},
   email:               {type: String},
   totalVenta:          {type: Number},
   totalNeto:           {type: Number},
   fechaVenta:          {type: Date},
   fechaLimite:         {type: Date},
   ventaDls:            {type: Boolean, default: false},
   operador:            operadorSchema,
   detalleViaje:        detalleViajeSchema,
   notasVenta:          [notaVentaSchema],
   estatusVenta:        {type: String, enum: ["En Proceso", "Tiempo Limite", "Pagada", "Cancelada"]}
}, {timestamps: true,versionKey: false});

module.exports = mongoose.model('venta', ventaSchema);