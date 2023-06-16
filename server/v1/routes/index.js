'use strict';

const express                   = require("express");

const ClientesRoute             = require('./ClientesRoute');
const OperadoresRoute           = require('./OperadoresRoute');
const UsersRoutes               = require('./UsersRoutes');

const router = express.Router();


router.use('/', ClientesRoute);
router.use('/', OperadoresRoute);
router.use('/', UsersRoutes);

module.exports = router;
