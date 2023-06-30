'use stricts';

const express               = require('express');
const router                = express.Router();

const { OperadorCtrl }      = require('../controllers');
const authMiddleware        = require('../../middleware/auth');


/* GET Calls */

router.get('/operadores/operadores', authMiddleware, OperadorCtrl.obtenerOperadores);

router.get('/operadores/operador/:operadorId', authMiddleware, OperadorCtrl.obtenerOperador);

/* POST Calls */

router.post('/operadores/operador', authMiddleware, OperadorCtrl.agregarOperador);

/* PUT Calls */

router.put('/operadores/operador/:operadorId', authMiddleware, OperadorCtrl.actualizarOperador);

/*DELETE calls */

router.delete('/operadores/operador/:operadorId', authMiddleware, OperadorCtrl.eliminarOperador);

module.exports = router;