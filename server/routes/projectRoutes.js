import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { projectSchema, querySchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(validate(querySchema), getProjects)
  .post(protect, authorize('admin', 'mentor'), validate(projectSchema), createProject);

router.route('/:id')
  .get(validate(projectSchema), getProjectById)
  .put(protect, authorize('admin', 'mentor'), validate(projectSchema), updateProject)
  .delete(protect, authorize('admin', 'mentor'), deleteProject);

export default router;
