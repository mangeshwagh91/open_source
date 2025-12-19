import express from 'express';
import {
  getRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap
} from '../controllers/roadmapController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { roadmapSchema, querySchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(validate(querySchema), getRoadmaps)
  .post(protect, authorize('admin'), validate(roadmapSchema), createRoadmap);

router.route('/:id')
  .get(validate(roadmapSchema), getRoadmapById)
  .put(protect, authorize('admin'), validate(roadmapSchema), updateRoadmap)
  .delete(protect, authorize('admin'), validate(roadmapSchema), deleteRoadmap);

export default router;
