import express from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByYear
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { studentSchema, querySchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(getStudents)
  .post(protect, authorize('admin'), validate(studentSchema), createStudent);

router.route('/year/:year')
  .get(getStudentsByYear);

router.route('/:id')
  .get(getStudentById)
  .put(protect, authorize('admin'), validate(studentSchema), updateStudent)
  .delete(protect, authorize('admin', 'mentor'), deleteStudent);

export default router;
