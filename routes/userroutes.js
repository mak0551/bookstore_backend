const express= require('express');
const router= express.Router();
const userctrl = require('../Routesctrl.js/userctrl')

router.post('/signup',userctrl.signup);
router.post('/signin',userctrl.signin);

module.exports= router;