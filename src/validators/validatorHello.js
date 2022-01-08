const Joi = require("joi");
const { PostRequest } = require("../configs/requests");
const validatorGeneric = require("./validatorGeneric");

module.exports = {
    async validatePostHello(req, res, next) {
        const joiObj = {};
        joiObj[PostRequest.MESSAGE] = Joi.string().required();

        return await validatorGeneric.validateGeneric(joiObj, { ...req.body }, next);
    }
}