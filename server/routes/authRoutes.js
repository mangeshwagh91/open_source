import express from 'express';
import {
  signup,
  signupUser,
  login,
  getMe,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup); // Student signup
router.post('/signup-user', signupUser); // Mentor/Contributor signup
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', protect, getMe);

export default router;