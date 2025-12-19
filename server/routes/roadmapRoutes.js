import express from 'express';
import {
  getRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap
} from '../controllers/roadmapController.js';

const router = express.Router();

router.route('/')
  .get(getRoadmaps)
  .post(createRoadmap);

router.route('/:id')
  .get(getRoadmapById)
  .put(updateRoadmap)
  .delete(deleteRoadmap);

export default router;
