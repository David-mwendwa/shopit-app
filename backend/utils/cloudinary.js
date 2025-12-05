import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export { cloudinary };

// import and parse req object as param
export const upload = async (req, options) => {
  try {
    let file = req.body?.avatar || req.body?.image || req.body?.images;
    if (file) {
      return await cloudinary.v2.uploader.upload(file, {
        resource_type: 'auto',
        ...options,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
