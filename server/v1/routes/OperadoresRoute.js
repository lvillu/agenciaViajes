'use stricts';

const express               = require('express');
const router                = express.Router();

const { OperadorCtrl }      = require('../controllers');


/* GET Calls */

router.get('/operadores/operadores', OperadorCtrl.obtenerOperadores);

router.get('/operadores/operador/:operadorId', OperadorCtrl.obtenerOperador);

/* POST Calls */

router.post('/operadores/operador', OperadorCtrl.agregarOperador);

/* PUT Calls */

router.put('/operadores/operador/:operadorId', OperadorCtrl.actualizarOperador);

/*DELETE calls */

router.delete('/operadores/operador/:operadorId', OperadorCtrl.eliminarOperador);

module.exports = router;