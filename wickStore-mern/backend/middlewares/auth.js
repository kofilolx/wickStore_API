const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

// Middleware to check if the user is authenticated
exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
    // Extract token from cookies
    const { token } = req.cookies;

    // If no token is found, return an error indicating that login is required
    if (!token) {
        return next(new ErrorHandler("Please Login to Access", 401));
    }

    // Verify the token and extract user data
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch the user based on the ID from the decoded token
    req.user = await User.findById(decodedData.id);
    // Proceed to the next middleware or route handler
    next();
});

// Middleware to authorize user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            // If the role is not allowed, return an error indicating insufficient permissions
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        // Proceed to the next middleware or route handler if the role is authorized
        next();
    }
}
