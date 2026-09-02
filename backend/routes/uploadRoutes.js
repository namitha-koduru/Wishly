import express from 'express';
import { uploadImages, deleteImage } from '../controllers/uploadController.js';
import { upload, handleMulterErrors } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// POST /api/uploads/images - Upload up to 10 images
router.post(
  '/images',
  handleMulterErrors(upload.array('images', 10)),
  uploadImages
);

// DELETE /api/uploads/images/:publicId - Delete an image by publicId
router.delete('/images/:publicId', deleteImage);

export default router;
