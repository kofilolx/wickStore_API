const sendToken = (user, statusCode, res) => {
    // Generate a JWT token for the user
    const token = user.getJWTToken();

    // Set options for the cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // Cookie expiration date
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
        sameSite: 'Strict', // Helps prevent CSRF attacks
    };

    // Send response with status code, set the cookie, and return user data along with the token
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;