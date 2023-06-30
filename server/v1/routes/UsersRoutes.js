'use stricts';

const express               = require('express');
const router                = express.Router();


const { UserCtrl, 
    UsuarioPruebasCtrl }    = require('../controllers');
const authMiddleware        = require('../../middleware/auth');

/* POST Calls */

router.post('/usuarios/registrar', UserCtrl.register);

router.post('/usuarios/login', UserCtrl.login);

router.post('/usuarios/logout', UserCtrl.logout);

router.post('/usuarios/refresh', UserCtrl.refresh);

router.get('/usuarios/usuario', authMiddleware, UserCtrl.user);

router.post('/usuarios/loginPostman', UsuarioPruebasCtrl.login);

router.post('/usuarios/logoutPostman', UsuarioPruebasCtrl.logout);

module.exports = router;