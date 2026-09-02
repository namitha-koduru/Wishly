import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

/**
 * POST /api/uploads/images
 * Upload one or multiple images to Cloudinary
 */
export const uploadImages = async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files were uploaded.'
      });
    }

    const occasion = req.body.occasion ? req.body.occasion.trim().toLowerCase() : 'general';

    // Upload all files concurrently
    const uploadPromises = files.map((file) => {
      return uploadToCloudinary(file.buffer, {
        folder: occasion,
        mimeType: file.mimetype,
        originalName: file.originalname
      });
    });

    const results = await Promise.all(uploadPromises);

    return res.status(200).json({
      success: true,
      images: results.map((item) => ({
        url: item.url,
        publicId: item.publicId,
        width: item.width,
        height: item.height,
        format: item.format
      }))
    });
  } catch (error) {
    console.error('Error in uploadImages controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload images. Please try again.',
      error: error.message
    });
  }
};

/**
 * DELETE /api/uploads/images/:publicId
 * Remove an image from Cloudinary
 */
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Image publicId is required.'
      });
    }

    const result = await deleteFromCloudinary(publicId);

    return res.status(200).json({
      success: true,
      message: 'Image deleted successfully.',
      result
    });
  } catch (error) {
    console.error('Error in deleteImage controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete image.',
      error: error.message
    });
  }
};
