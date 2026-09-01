import express from 'express';
import { createWish, getWishByProjectId } from '../controllers/wishController.js';

const router = express.Router();

// POST /api/wishes - Create new customized wish
router.post('/', createWish);

// GET /api/wishes/:projectId - Retrieve customized wish by ID
router.get('/:projectId', getWishByProjectId);

export default router;
