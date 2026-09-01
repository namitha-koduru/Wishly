import express from 'express';
import { getProjectById, createProject } from '../controllers/projectController.js';

const router = express.Router();

// GET /api/projects/:projectId - Fetch a generated wish project
router.get('/:projectId', getProjectById);

// POST /api/projects - Create a new wish project
router.post('/', createProject);

export default router;
