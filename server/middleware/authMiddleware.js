import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import { asyncHandler } from './validationMiddleware.js';

// Middleware to protect routes - requires valid JWT
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = await Student.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ message: 'Student not found' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

// Middleware for role-based access control (admin functionality)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // For now, all authenticated students have access
    // You can extend Student model to add role field if needed
    next();
  };
};