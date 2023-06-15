'use strict';
const { OperadorModel }                  = require('../../models');

const obtenerOperadores =  async (req,res,next) => {
    try{
        let data = await OperadorModel.find({activo:true},
            {_id:1,nombre:1, siglas:1}).sort({_id:1});
        
        if(!data || data.length == 0)
            return res.status(200).send({ 
                success: true,
                data: [],
                message: "Operadores no encontrados"
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

const obtenerOperador =  async (req,res,next) => {
    const {operadorId}  = req.params;
    try{
        let data = await OperadorModel.findOne({_id: operadorId},
            {}).sort({ _id:1 });

        if(!data || data.length == 0)
            return res.status(200).send({ 
                success: true,
                data: {},
                message: "Operador no encontrado"
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


const agregarOperador =  async (req,res,next) => {
    let body = req.body;

    if(Object.keys(body).length == 0) 
        return res.status(400).send({
            success: false,
            data: {},
            message: "Not information send's"
        });

    try{

        let data = await OperadorModel(body).save();
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

const actualizarOperador = async(req,res,next) => {
    let update    = req.body;
    let {operadorId}= req.params;
    let filter    = {_id:operadorId};

    if(!operadorId){
        return  res.status(400).send({
            success: false,
            data: {},
            message:'Operador Id necesario'
        });
    }

    if(Object.keys(update).length == 0) 
        return res.status(400).send({ 
            success: false,
            data: {},
            message: "Se necesita informacion para actualizar"
        });

    try{
        let data = await OperadorModel.findOneAndUpdate(filter, update, {
            new: true            
        });
     
        if(data){
            return res.status(204).json();
        }else {
            return res.status(404).send({
                success: false,
                data: {},
                message:"Operador no encontrado"
            });
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
};

const eliminarOperador =  async (req,res,next) => {
    const {operadorId}  = req.params;

    if(!operadorId){
        return  res.status(400).send({
            success: false,
            data: {},
            message:'Operador Id necesario'
        });
    }

    try{
        let data = await OperadorModel.findOneAndUpdate({_id: operadorId},{activo:false},{new:true});

        if(!data)
            return res.status(404).send({ 
                success:false,
                data: {},
                message: "Operador no encontrado"
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
    obtenerOperadores,
    obtenerOperador,
    agregarOperador,
    actualizarOperador,
    eliminarOperador
};