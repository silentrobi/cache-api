const { ErrorHandler, errorCodes } = require("../utils/error");

module.exports = {
    async genericServiceMethod(functionName, internalMethod) {
        try {
            console.log(`Controller method called: ${functionName}`);
            return await internalMethod();
        } catch (error) {
            throw new ErrorHandler(errorCodes.GENEREL_ERROR, error.message);
        }
    }
}