const ErrorHandler = require("../utils/errorHandler");

// Middleware for handling errors
module.exports = (err, req, res, next) => {
    // Set default status code and message if not provided
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Handle MongoDB CastError, which indicates an invalid ID format
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Handle Mongoose duplicate key error, indicating a conflict with existing entries
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle JSON Web Token (JWT) errors indicating invalid tokens
    if (err.code === "JsonWebTokenError") {
        const message = 'JWT Error';
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT expiration errors indicating the token has expired
    if (err.code === "TokenExpiredError") {
        const message = 'JWT is Expired';
        err = new ErrorHandler(message, 400);
    }

    // Send response with the error status code and message
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}
