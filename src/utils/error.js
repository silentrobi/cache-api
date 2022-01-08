class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (error, res) => {
  const { statusCode, message } = error;
  res.status(400).json({
    status: "error",
    statusCode,
    message
  });
};

const errorCodes = {
  GENEREL_ERROR: 1000,
  VALIDATION_ERROR: 1001
}
module.exports = {
  ErrorHandler,
  handleError,
  errorCodes
}