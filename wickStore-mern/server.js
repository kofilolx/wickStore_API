const path = require('path'); // Core module for handling and transforming file paths
const express = require('express'); // Express framework for creating the server
const cloudinary = require('cloudinary'); // Cloudinary for handling image uploads
const app = require('./backend/app'); // Import the main Express application
const connectDB = require('./backend/config/database'); // Database connection function
const PORT = process.env.PORT || 5000; // Server port from environment variables or default to 5000

/*
Handle uncaught exceptions to prevent server crashes from unexpected errors.
The process exits with an error code after logging the error.
*/
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

// Connect to MongoDB database
connectDB();

/*
Configure Cloudinary settings using environment variables to set the cloud name, API key, and secret.
This allows secure handling of image storage and retrieval.
*/
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


/* 
Start the server and listen on the specified port. 
Log the server URL once it’s running to verify the connection.
*/
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/*
Handle unhandled promise rejections. If a promise fails without being caught,
log the error and close the server gracefully before exiting.
*/
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
