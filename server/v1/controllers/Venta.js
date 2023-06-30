'use strict';
const { VentaModel }                  = require('../../models');

const obtenerVentas =  async (req,res,next) => {
    try{
        let data = await VentaModel.find({activo:true},
            {_id:1,nombre:1, siglas:1}).sort({_id:1});
        
        if(!data || data.length == 0)
            return res.status(200).send({ 
                success: true,
                data: [],
                message: "Ventas no encontradas"
            });

        return res.status(200).send({
                success: true,
                data: data,
                message: ""
        });
    }
    catch (err) {
        return res.status(500).send({error:err});
    }
};

const obtenerVenta =  async (req,res,next) => {
    const {VentaId}  = req.params;
    try{
        let data = await VentaModel.findOne({_id: VentaId},
            {}).sort({ _id:1 });

        if(!data || data.length == 0)
            return res.status(200).send({ 
                success: true,
                data: {},
                message: "Venta no encontrada"
            });

        return res.status(200).send({
                success: true,
                data: data,
                message: ""
        });
    }
    catch (err) {
        return res.status(500).send({error:err});
    }
};

const agregarVenta =  async (req,res,next) => {
    let body = req.body;

    if(Object.keys(body).length == 0) 
        return res.status(400).send({
            success: false,
            data: {},
            message: "No se esta recibiendo informacion"
        });

    try{

        let data = await VentaModel(body).save();
        return res.status(201).send({
            success: true,
            data: data,
            message: ""
        });
    }
    catch (err) {
        return res.status(500).send({error:err});
    }
};

const actualizarVenta = async(req,res,next) => {
    let update    = req.body;
    let {VentaId}= req.params;
    let filter    = {_id:VentaId};

    if(!VentaId){
        return  res.status(400).send({
            success: false,
            data: {},
            message:'Venta Id necesario'
        });
    }

    if(Object.keys(update).length == 0) 
        return res.status(400).send({ 
            success: false,
            data: {},
            message: "Se necesita informacion para actualizar"
        });

    try{
        let data = await VentaModel.findOneAndUpdate(filter, update, {
            new: true            
        });
     
        if(data){
            return res.status(204).json();
        }else {
            return res.status(404).send({
                success: false,
                data: {},
                message:"Venta no encontrada"
            });
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
};

const eliminarVenta =  async (req,res,next) => {
    const {VentaId}  = req.params;

    if(!VentaId){
        return  res.status(400).send({
            success: false,
            data: {},
            message:'Venta Id necesario'
        });
    }

    try{
        let data = await VentaModel.findOneAndUpdate({_id: VentaId},{activo:false},{new:true});

        if(!data)
            return res.status(404).send({ 
                success:false,
                data: {},
                message: "Venta no encontrada"
            });

        return res.status(204).send();
    }
    catch (err) {
        return res.status(500).send({
            success: true,
            data: {},
            message: err
        });
    }
};


module.exports = {
    obtenerVentas,
    obtenerVenta,
    agregarVenta,
    actualizarVenta,
    eliminarVenta
};