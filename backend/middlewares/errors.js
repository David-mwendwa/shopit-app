import { StatusCodes } from 'http-status-codes';
import ErrorHandler from '../utils/errorHandler.js';

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  } else {
    let error = { ...err };
    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    // Handle Mongoose Validation Error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    // Handle Mongoose Duplicate Key Error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    // Handle JWT Error
    if (err.name === 'JsonWebTokenError') {
      const message = 'JSON Web Token is invalid. Try Again!!!';
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    // Handle JWT Expired Error
    if (err.name === 'TokenExpiredError') {
      const message = 'JSON Web Token is expired. Try Again!!!';
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message || 'Server Error',
    });
  }
};

export default errorHandler;
