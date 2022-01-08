const serviceHello = require('../services/serviceHello');
const controllerGeneric = require('./controllerGeneric');

const fileName = `controllers/controllerHello`;

module.exports = {
    async getHello(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/getHello`,
            200, res, next,
            async () => await serviceHello.getHello()
        );
    },
    async getHelloError(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/getHelloError`,
            200, res, next,
            async () => await serviceHello.getHelloError()
        );
    },
    async postHello(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/getHelloError`,
            201, res, next,
            async () => await serviceHello.postHello(req.body)
        );
    },
};
