const { ErrorHandler } = require("../utils/error");

module.exports = {
    async genericServiceMethod(functionName, internalMethod) {
        try {
            //add log
            return await internalMethod();
        } catch (error) {
            // Map error from services and throw new ErrorHandler
            throw new ErrorHandler(1000, error.message);
        }
    }
}