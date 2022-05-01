const { StatusCodes } = require('http-status-codes');
const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
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

    // wrong mongoose object ID error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    // handle mongoose validation error
    if (err.name === 'ValidationError') {
      let message = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      let regex = /`(\w+)`/g;
      let fields = [];
      let match = regex.exec(message);
      while (match !== null) {
        fields.push(match[1]);
        match = regex.exec(message);
      }
      message =
        (fields.length &&
          `${fields.join(', ')} ${
            fields.length > 1 ? 'fields are' : 'field is'
          } required`) ||
        message;
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }
    // if (err.name === 'ValidationError') {
    //   let message = Object.values(err.errors)
    //     .map((item) => item.message)
    //     .join(', ');
    //   error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    // }

    // handle mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    // handle wrong jwt error
    if (err.name === 'JsonWebTokenError') {
      const message = `JSON Web Token is invalid. Please try again.`;
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    // handle expired jwt error
    if (err.name === 'TokenExpiredError') {
      const message = `JSON Web Token is expired. Please try again.`;
      error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
    }

    res.status(404).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
    // res.status(500).json({
    //   success: false,
    //   error: error,
    //   errMessage: error.message,
    //   stack: error.stack,
    // });
  }
};
