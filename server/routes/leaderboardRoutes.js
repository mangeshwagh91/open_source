import express from 'express';
import {
  getLeaderboard,
  getLeaderboardById,
  createLeaderboardEntry,
  updateLeaderboardEntry,
  deleteLeaderboardEntry
} from '../controllers/leaderboardController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { leaderboardSchema, querySchema } from '../validators/schemas.js';

const router = express.Router();

router.route('/')
  .get(validate(querySchema), getLeaderboard)
  .post(protect, authorize('admin'), validate(leaderboardSchema), createLeaderboardEntry);

router.route('/:id')
  .get(validate(leaderboardSchema), getLeaderboardById)
  .put(protect, authorize('admin'), validate(leaderboardSchema), updateLeaderboardEntry)
  .delete(protect, authorize('admin'), validate(leaderboardSchema), deleteLeaderboardEntry);

export default router;
