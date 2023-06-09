const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

// Handle the uncalled exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to Uncaught Exceptions');
    process.exit();
});


// Setting up config file
dotenv.config({ path: 'backend/config/config.env'});


// Connecting to Database
connectDatabase();

// Setting up cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to unhandled Promise Rejection');
    server.close(() => {
        process.exit(1)
    })
});