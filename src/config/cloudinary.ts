import cloudinary from './cloudinaryConfig';

export const uploadImageToCloudinary = async (base64Image: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'products',
    });
    return result;
  } catch (error) {
    console.log('Error uploading image to Cloudinary:', error);
    throw new Error('Error uploading image to Cloudinary');
  }
};