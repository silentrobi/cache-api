const Joi = require('joi');
const { ErrorHandler } = require('../utils/error');

module.exports = {
    async validateGeneric(joiObj, data, next, options = {}) {
        const schema = Joi.object(joiObj);
        const { error } = schema.validate(data, options);
        if (error) {
            throw new ErrorHandler(400, error.message);
        }

        return next();
    }
};
