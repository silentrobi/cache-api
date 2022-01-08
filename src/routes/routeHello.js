const express = require('express');
const controllerHello = require('../controllers/controllerHello');
const validatorHello = require('../validators/validatorHello');
const router = express.Router();

router.get(`/getHelloOk`, controllerHello.getHello);
router.get(`/getHelloNotOk`, controllerHello.getHelloError);
router.post(`/postHello`, validatorHello.validatePostHello,  controllerHello.postHello);
module.exports = router;
