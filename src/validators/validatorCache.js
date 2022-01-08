const Joi = require('joi');
const validatorGeneric = require('./validatorGeneric');
const { UPSERT_BODY } = require("../configs/requests");

module.exports = {
    async validateUpsert(req, res, next) {
        const joiObj = {};
        joiObj[UPSERT_BODY.KEY] = Joi.string().required();
        joiObj[UPSERT_BODY.VALUE] = Joi.any().required();

        return await validatorGeneric.validateGeneric(joiObj, { ...req.body }, next);
    }
}