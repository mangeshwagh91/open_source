import express from 'express';
import {
  getContributionStats,
  getRepoContributions,
  getAllContributions
} from '../controllers/contributionController.js';

const router = express.Router();

router.get('/stats', getContributionStats);
router.get('/repo/:owner/:repo', getRepoContributions);
router.get('/', getAllContributions);

export default router;
