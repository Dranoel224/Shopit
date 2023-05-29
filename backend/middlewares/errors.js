const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    
    err.statuscode = err.statuscode || 500;
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statuscode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}
        error.message = err.message

        // Wrong mongoose Object ID Error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handling mongoose validation Error
        if(err.message === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling the mongoose duplicate errors
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyvalue)} entered.`
            error = new ErrorHandler(message, 400);
        }


        // Handling  wrong JWT error
        if(err.name === 'TokenExpiredError'){
            const message = 'JSON Web Token is invalid. Try again!!!'
            error = new ErrorHandler(message, 400);
        }

        // Handling  Expired JWTerror
        if(err.name === 'JsonWebTokenError'){
            const message = 'JSON Web Token is Expired. Try again!!!'
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statuscode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}