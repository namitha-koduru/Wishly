import express from 'express';

const router = express.Router();

// GET /api/health - Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Wishly API is running'
  });
});

export default router;
