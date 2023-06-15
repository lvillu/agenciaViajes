'use strict';

const express                   = require("express");

const ClientesRoute             = require('./ClientesRoute');
const OperadoresRoute           = require('./OperadoresRoute')

const router = express.Router();


router.use('/', ClientesRoute);
router.use('/', OperadoresRoute);


module.exports = router;
