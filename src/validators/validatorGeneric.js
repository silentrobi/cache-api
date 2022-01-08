const Joi = require('joi');
const { ErrorHandler, errorCodes } = require('../utils/error');

module.exports = {
    async validateGeneric(joiObj, data, next, options = {}) {
        try {
            const schema = Joi.object(joiObj);
            const { error } = schema.validate(data, options);
            if (error) {
                throw new ErrorHandler(errorCodes.VALIDATION_ERROR, error.message);
            }
        } catch (error) {
            next(error);
        }

        return next();
    }
};
