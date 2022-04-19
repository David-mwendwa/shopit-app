const { StatusCodes } = require('http-status-codes');

exports.getProducts = (req, res, next) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'This route will show products in the database',
  });
};
