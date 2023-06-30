'use stricts';

const express               = require('express');
const router                = express.Router();

const { VentaCtrl }      = require('../controllers');
const authMiddleware        = require('../../middleware/auth');


/* GET Calls */

router.get('/ventas/ventas', authMiddleware, VentaCtrl.obtenerVentas);

router.get('/ventas/venta/:VentaId', authMiddleware, VentaCtrl.obtenerVenta);

/* POST Calls */

router.post('/ventas/venta', authMiddleware, VentaCtrl.agregarVenta);

/* PUT Calls */

router.put('/ventas/venta/:VentaId', authMiddleware, VentaCtrl.actualizarVenta);

/*DELETE calls */

router.delete('/ventas/venta/:VentaId', authMiddleware, VentaCtrl.eliminarVenta);

module.exports = router;