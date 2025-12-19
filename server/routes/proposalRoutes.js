import express from 'express';
import {
  getProposals,
  getProposalById,
  getMyProposals,
  createProposal,
  updateProposal,
  deleteProposal,
  acceptProposal,
  rejectProposal,
  getProposalStats
} from '../controllers/proposalController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public/Protected routes
router.route('/')
  .get(protect, getProposals)
  .post(protect, createProposal);

router.get('/my-proposals', protect, getMyProposals);
router.get('/stats', protect, authorize('admin'), getProposalStats);

router.route('/:id')
  .get(protect, getProposalById)
  .put(protect, updateProposal)
  .delete(protect, deleteProposal);

// Admin-only routes
router.post('/:id/accept', protect, authorize('admin'), acceptProposal);
router.post('/:id/reject', protect, authorize('admin'), rejectProposal);

export default router;
