// Uncomment if using dotenv to load environment variables from a .env file
// require('dotenv').config();

const path = require('path'); // Core module for handling and transforming file paths
const express = require('express'); // Express framework for creating the server
const cloudinary = require('cloudinary'); // Cloudinary for handling image uploads
const app = require('./backend/app'); // Import the main Express application
const connectDatabase = require('./backend/config/database'); // Database connection function
const PORT = process.env.PORT || 4000; // Server port from environment variables or default to 4000

/*
Handle uncaught exceptions to prevent server crashes from unexpected errors.
The process exits with an error code after logging the error.
*/
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

// Connect to MongoDB database
connectDatabase();

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
Deployment setup to serve the frontend in production. 
When in production mode, the server serves static files from the React frontend’s build directory.
For all other requests, it sends the index.html file, allowing React Router to handle client-side routing.
*/
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {
    // Development mode message confirming server is running
    app.get('/', (req, res) => {
        res.send('Server is Running!');
    });
}

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
