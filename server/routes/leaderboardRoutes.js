import express from 'express';
import {
  getLeaderboard,
  getLeaderboardById,
  createLeaderboardEntry,
  updateLeaderboardEntry,
  deleteLeaderboardEntry
} from '../controllers/leaderboardController.js';

const router = express.Router();

router.route('/')
  .get(getLeaderboard)
  .post(createLeaderboardEntry);

router.route('/:id')
  .get(getLeaderboardById)
  .put(updateLeaderboardEntry)
  .delete(deleteLeaderboardEntry);

export default router;
