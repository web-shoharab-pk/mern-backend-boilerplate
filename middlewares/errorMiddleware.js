const ErrorHandler = require("../error/errorHandler");

exports.errorMiddleware = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // MONGODB WRONG ID ERROR
    if(err.name === "CastError") {
     const message = `Resource not found. Invalid: ${err.path}`;
     err = new ErrorHandler(message, 400)  
    }

    // MONGOOSE DUPLICATE KEY ERROR 
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered!`;
        err = new ErrorHandler(message, 400)  
    }

    // WRONG JWT ERROR  
    if(err.message === 'jsonWebToken') {
        const message = `Json Web Token is Invalid, Try Again!`;
        err = new ErrorHandler(message, 400)  
    }

     // JWT EXPIRE ERROR
     if(err.name === 'TokenExpiredError') {
        const message = `Json Web Token is Expired, Try Again!`;
        err = new ErrorHandler(message, 400)  
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}