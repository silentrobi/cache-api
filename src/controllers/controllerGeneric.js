const { ApiResponse } = require("../utils/response");

module.exports = {
    async genericControllerMethod(functionName, httpStatusCode, res, next, internalMethod) {
        try {
            console.log(`Controller method called: ${functionName}`);
            const serviceResult = await internalMethod();
            const httpResponse = ApiResponse(serviceResult);

            return res.status(httpStatusCode).json(httpResponse);
        } catch (error) {
            next(error);
        }
    },
};
