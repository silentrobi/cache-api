const Joi = require('joi');
const { ErrorHandler } = require('../utils/error');

module.exports = {
    async validateGeneric(joiObj, data, next, options = {}) {
        try {
            const schema = Joi.object(joiObj);
            const { error } = schema.validate(data, options);
            if (error) {
                throw new ErrorHandler(400, error.message);
            }
        } catch (error) {
            next(error);
        }

        return next();
    }
};
