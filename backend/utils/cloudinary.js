const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// import and parse req object as param
exports.upload = async (req, res) => {
  try {
    let file = req.files?.avatar || req.files?.image || req.files?.images;
    if (file) {
      return await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'avatars', // cloudinary folder where you want to save the images
        // width: 300, // width of an image
        // crop: 'scale',
        resource_type: 'auto',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
