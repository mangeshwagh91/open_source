import express from 'express';
import { syncRepository, githubWebhook, getRepoData } from '../controllers/githubController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin-triggered sync
router.post('/sync', protect, authorize('admin'), syncRepository);

// GitHub webhook endpoint (configure secret in env)
router.post('/webhook', githubWebhook);

// Proxy for public repo data (for frontend, no auth)
router.get('/repo', getRepoData);

export default router;
