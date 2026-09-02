import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = () => {
  return Boolean(cloudName && apiKey && apiSecret && cloudName.trim() !== '' && apiKey.trim() !== '' && apiSecret.trim() !== '');
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
  console.log('☁️  Cloudinary configured successfully for image storage.');
} else {
  console.log('ℹ️  Cloudinary credentials not detected in backend/.env. Running with local development fallback store for images.');
}

/**
 * Upload a single image buffer directly to Cloudinary using a stream
 * @param {Buffer} buffer - File buffer from multer
 * @param {Object} options - Options such as folder, tags, etc.
 * @returns {Promise<{url: string, publicId: string, width: number, height: number, format: string}>}
 */
export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      // Local development fallback: generate a mock/data placeholder if Cloudinary is not yet configured
      const base64 = buffer.toString('base64');
      const mimeType = options.mimeType || 'image/jpeg';
      const mockPublicId = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      return resolve({
        url: `data:${mimeType};base64,${base64}`,
        publicId: mockPublicId,
        width: 1200,
        height: 800,
        format: mimeType.split('/')[1] || 'jpg'
      });
    }

    const folder = options.folder ? `wishly/${options.folder}` : 'wishly';

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto', fetch_format: 'auto', width: 1400, crop: 'limit' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format
        });
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Delete an image from Cloudinary by its publicId
 * @param {string} publicId
 * @returns {Promise<Object>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!isCloudinaryConfigured() || !publicId || publicId.startsWith('dev_')) {
    return { result: 'ok', mocked: true };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary destroy error:', error);
    throw error;
  }
};

export default {
  cloudinary,
  isCloudinaryConfigured,
  uploadToCloudinary,
  deleteFromCloudinary
};
