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
  .post(protect, authorize('mentor','admin'), validate(projectSchema), createProject);

router.route('/:id')
  .get(validate(projectSchema), getProjectById)
  .put(protect, authorize('mentor','admin'), validate(projectSchema), updateProject)
  .delete(protect, authorize('mentor','admin'), validate(projectSchema), deleteProject);

export default router;
