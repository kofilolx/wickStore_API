const mongoose = require('mongoose');

/* 
Set the strict query mode, which defines how strictly mongoose should apply filters
when querying the database. Adjust this setting based on application requirements.
*/
mongoose.set('strictQuery', true);

/* 
Define a function to connect to the MongoDB database. This function uses
the MongoDB URI stored in environment variables to initiate the connection.
*/
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,       // Recommended parser to handle MongoDB connection strings
        useUnifiedTopology: true,    // Improved connection management
    })
    .then(() => {
        /* Log a success message if the connection to MongoDB is established */
        console.log('MongoDB connected');
    })
    .catch(err => {
        /* 
        Log an error message if there’s a problem connecting to MongoDB.
        Exits the process with a failure status code to ensure visibility of the issue.
        */
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });
};


/* Export the connectDatabase function for use in other parts of the application */
module.exports = connectDB;
