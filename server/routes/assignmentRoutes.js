import express from 'express';
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByStudent
} from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { assignmentSchema, querySchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), validate(querySchema), getAssignments)
  .post(protect, authorize('admin'), validate(assignmentSchema), createAssignment);

router.route('/student/:studentId')
  .get(protect, authorize('admin'), getAssignmentsByStudent);

router.route('/:id')
  .get(protect, authorize('admin'), validate(assignmentSchema), getAssignmentById)
  .put(protect, authorize('admin'), validate(assignmentSchema), updateAssignment)
  .delete(protect, authorize('admin'), validate(assignmentSchema), deleteAssignment);

export default router;
