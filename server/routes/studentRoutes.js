import express from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByClass
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { studentSchema, querySchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), validate(querySchema), getStudents)
  .post(protect, authorize('admin'), validate(studentSchema), createStudent);

router.route('/class/:className')
  .get(protect, authorize('admin'), getStudentsByClass);

router.route('/:id')
  .get(protect, authorize('admin'), validate(studentSchema), getStudentById)
  .put(protect, authorize('admin'), validate(studentSchema), updateStudent)
  .delete(protect, authorize('admin'), validate(studentSchema), deleteStudent);

export default router;
