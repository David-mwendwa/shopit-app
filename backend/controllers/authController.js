const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Register user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      new ErrorHandler(
        'Please provide name, email and password',
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'kccvibpsuiusmwfepb3m',
      url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png',
    },
  });

  const token = user.getJwtToken();
  res.status(StatusCodes.CREATED).json({
    success: true,
    token,
  });
});

// login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler(
        'Please enter email and password',
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(
      new ErrorHandler('Incorrect email or password', StatusCodes.NOT_FOUND)
    );
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(
      new ErrorHandler('Incorrect email or password', StatusCodes.NOT_FOUND)
    );
  }
  const token = user.getJwtToken();
  res.status(StatusCodes.OK).json({
    success: true,
    token,
  });
});
