'use strict';
const { VentaModel }                  = require('../../models');

const obtenerVentas =  async (req,res,next) => {
    try{
        let data = await VentaModel.find({},
            { _id:1, titular:1, claveReserva:1, operador:1, detalleViaje: 1 }).sort({_id:1});
        
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

const agregarNotaVenta =  async (req,res,next) => {
    const {VentaId}  = req.params;
    let body = req.body;

    if(Object.keys(body).length == 0) 
        return res.status(400).send({
            success: false,
            data: {},
            message: "No se esta recibiendo informacion"
        });

    try{

        let ventaObj = await VentaModel.findOne({_id: VentaId},
            { notasVenta: 1 }).sort({ _id:1 });

        if(!ventaObj || ventaObj.length == 0)
            return res.status(200).send({ 
                success: true,
                data: {},
                message: "Venta no encontrada"
            });


        await ventaObj.notasVenta.push(body);
        const result = await ventaObj.save();
        
        if(!result)
            return res.status(500).send({
                success: false,
                data: {},
                message: "No se pudo agegar la nota de venta"
            });
        else
            return res.status(201).send({
                success: true,
                data: result.notasVenta,
                message: ""
            });
    }
    catch (err) {
        console.log("Err", err)
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

const actualizarNotaVenta =  async (req,res,next) => {
    const {VentaId}  = req.params;
    const notaVentaId = req.headers.notaventaid;
    let body = req.body;

    if(Object.keys(body).length == 0) 
        return res.status(400).send({
            success: false,
            data: {},
            message: "No se esta recibiendo informacion"
        });

    try{

        let ventaObj = await VentaModel.findOneAndUpdate(
            {
                _id: VentaId, "notasVenta._id": notaVentaId
            },
            {
                $set: {
                    'notasVenta.$': body
                }
            },
            {
                select: {
                    notasVenta: {
                        $elemMatch:
                            { _id: notaVentaId }
                    }
                }
            });

        if(!ventaObj || ventaObj.length == 0)
            return res.status(200).send({ 
                success: true,
                data: {},
                message: "Venta no encontrada"
            });
        else
            return res.status(201).send({
                success: true,
                data: ventaObj.notasVenta,
                message: ""
            });
    }
    catch (err) {
        console.log("Err", err)
        return res.status(500).send({error:err});
    }
};


module.exports = {
    obtenerVentas,
    obtenerVenta,
    agregarVenta,
    agregarNotaVenta,
    actualizarVenta,
    actualizarNotaVenta
};