const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath, folder = 'fullBack1') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary');
  }
};

module.exports = uploadToCloudinary;