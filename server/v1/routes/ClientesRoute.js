'use stricts';

const express               = require('express');
const router                = express.Router();

const { ClienteCtrl }      = require('../controllers');


/* GET Calls */

router.get('/clientes/clientes', ClienteCtrl.obtenerClientes);

router.get('/clientes/cliente/:ClienteId', ClienteCtrl.obtenerCliente);

/* POST Calls */

router.post('/clientes/cliente', ClienteCtrl.agregarCliente);

/* PUT Calls */

router.put('/clientes/cliente/:ClienteId', ClienteCtrl.actualizarCliente);

/*DELETE calls */

router.delete('/clientes/cliente/:ClienteId', ClienteCtrl.eliminarCliente);

module.exports = router;