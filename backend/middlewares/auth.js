import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from './catchAsyncErrors.js';

// checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
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

export const authorizeRoles = (...roles) => {
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
