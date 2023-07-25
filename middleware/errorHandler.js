const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong!! Please try again later.",
    };

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field. Please use another value.`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
