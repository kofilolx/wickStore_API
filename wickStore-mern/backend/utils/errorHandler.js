class ErrorHandler extends Error {
    // Constructor to initialize the error message, status code, and optional properties
    constructor(message, statusCode, isOperational = true) {
        // Call the parent class (Error) constructor with the message
        super(message);
        
        // Set the status code for the error
        this.statusCode = statusCode;
        
        // Indicates whether the error is operational or a programmer error
        this.isOperational = isOperational;

        // Capture the stack trace for debugging purposes
        Error.captureStackTrace(this, this.constructor);
    }

    // Method to log the error details (could be extended to log to a file or monitoring service)
    logError() {
        // Logging the error details to the console (can be replaced with a logging library)
        console.error(`[${this.statusCode}] ${this.message}`);
    }

    // Method to format the error response
    getFormattedResponse() {
        return {
            status: 'error',
            statusCode: this.statusCode,
            message: this.message,
        };
    }
}

// Export the ErrorHandler class for use in other parts of the application
module.exports = ErrorHandler;
