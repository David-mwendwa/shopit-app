const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');

// Register user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const file = req.files.avatar; // pass as file.tempFilePath
  const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

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
      public_id: result.public_id,
      url: result.secure_url,
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
  // const resetUrl = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/password/reset/${resetToken}`;
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
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

// Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('old password is incorrect'));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, StatusCodes.OK, res);
});

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = { name: req.body.name, email: req.body.email }; // TODO: should not update the role

  // update avatar
  const file = req.files.avatar;
  if (file) {
    const user = await User.findById(req.user.id);
    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });
    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ success: true, user });
});

// logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(StatusCodes.OK).json({ success: true, message: 'Logged out' });
});

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ success: true, users });
});

// Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`No user found with id: ${req.params.id}`));
  }
  res.status(StatusCodes.OK).json({ success: true, user });
});

// Update user profile - admin => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // TODO: update avatar

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(StatusCodes.OK).json({ success: true, user });
});

// Get user details => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`No user found with id: ${req.params.id}`));
  }

  // TODO: Remove avatar from cloudinary

  await user.remove();
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'User deleted successfully' });
});
