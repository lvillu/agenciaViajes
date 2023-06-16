'use stricts';

const express               = require('express');
const router                = express.Router();


const { UserCtrl }      = require('../controllers');
const authMiddleware    = require('../../middleware/auth');

/* POST Calls */

router.post('/usuarios/registrar', UserCtrl.register);

router.post('/usuarios/login', UserCtrl.login);

router.post('/usuarios/logout', UserCtrl.logout);

router.post('/usuarios/refresh', UserCtrl.refresh);

router.get('/usuarios/usuario', authMiddleware, UserCtrl.user);

module.exports = router;