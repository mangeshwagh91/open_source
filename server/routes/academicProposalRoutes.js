import express from 'express';
import {
  getAcademicProposals,
  getProposalsByStudent,
  createAcademicProposal,
  acceptProposal,
  rejectProposal,
  getProposalById,
  deleteProposal
} from '../controllers/academicProposalController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all proposals (mentors/admins)
router.get('/', protect, authorize('admin', 'mentor'), getAcademicProposals);

// Create new proposal (students/contributors)
router.post('/', protect, createAcademicProposal);

// Get proposals by student
router.get('/student/:studentId', protect, getProposalsByStudent);

// Get, update, delete specific proposal
router.route('/:id')
  .get(protect, getProposalById)
  .delete(protect, deleteProposal);

// Accept/Reject proposals (mentors/admins only)
router.put('/:id/accept', protect, authorize('admin', 'mentor'), acceptProposal);
router.put('/:id/reject', protect, authorize('admin', 'mentor'), rejectProposal);

export default router;
