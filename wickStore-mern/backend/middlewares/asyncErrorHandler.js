// Middleware to handle asynchronous errors in Express.js
module.exports = (errorFunction) => {
    return (req, res, next) => {
        // Wrap the error function in a promise and catch any errors
        Promise.resolve(errorFunction(req, res, next)).catch(next);
    };
};
