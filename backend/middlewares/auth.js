const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

// checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler(
        'You must login first to access this resource',
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(userId);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          StatusCodes.FORBIDDEN
        )
      );
    }
    next();
  };
};
