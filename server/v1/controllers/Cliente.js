'use strict';
const { ClienteModel }                  = require('../../models');

const obtenerClientes =  async (req,res,next) => {
    try{
        let data = await ClienteModel.find({activo:true},
            {_id:1,nombre:1, apPaterno:1,  apMaterno:1, telefono:1, direccion:1, fecNacimiento:1}).sort({_id:1});
        
        if(!data || data.length == 0)
            return res.status(200).send({ 
                success: true,
                data: [],
                message: "Clientes no encontrados"
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

const obtenerCliente =  async (req,res,next) => {
    const {ClienteId}  = req.params;
    try{
        let data = await ClienteModel.findOne({_id: ClienteId},
            {}).sort({ _id:1 });

        if(!data || data.length == 0)
            return res.status(200).send({ 
                success: true,
                data: {},
                message: "Cliente no encontrado"
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


const agregarCliente =  async (req,res,next) => {
    let body = req.body;

    if(Object.keys(body).length == 0) 
        return res.status(400).send({
            success: false,
            data: {},
            message: "Not information send's"
        });

    try{

        let data = await ClienteModel(body).save();
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

const actualizarCliente = async(req,res,next) => {
    let update    = req.body;
    let {ClienteId}= req.params;
    let filter    = {_id:ClienteId};

    if(!ClienteId){
        return  res.status(400).send({
            success: false,
            data: {},
            message:'Cliente Id necesario'
        });
    }

    if(Object.keys(update).length == 0) 
        return res.status(400).send({ 
            success: false,
            data: {},
            message: "Se necesita informacion para actualizar"
        });

    try{
        let data = await ClienteModel.findOneAndUpdate(filter, update, {
            new: true            
        });
     
        if(data){
            return res.status(204).json();
        }else {
            return res.status(404).send({
                success: false,
                data: {},
                message:"Cliente no encontrado"
            });
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
};

const eliminarCliente =  async (req,res,next) => {
    const {ClienteId}  = req.params;

    if(!ClienteId){
        return  res.status(400).send({
            success: false,
            data: {},
            message:'Cliente Id necesario'
        });
    }

    try{
        let data = await ClienteModel.findOneAndUpdate({_id: ClienteId},{activo:false},{new:true});

        if(!data)
            return res.status(404).send({ 
                success:false,
                data: {},
                message: "Cliente no encontrado"
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
    obtenerClientes,
    obtenerCliente,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
};