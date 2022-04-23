const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');

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
  sendToken(user, StatusCodes.OK, res);
});

// forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('User not found', StatusCodes.NOT_FOUND));
  }
  // get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopIT Password Recovery',
      message,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message));
  }
});

// reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // hash url token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has expired',
        StatusCodes.BAD_REQUEST
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler('Password does not match', StatusCodes.BAD_REQUEST)
    );
  }
  // setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, StatusCodes.OK, res);
});

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
});

// logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(StatusCodes.OK).json({ success: true, message: 'Logged out' });
});
