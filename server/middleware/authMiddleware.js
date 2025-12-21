import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import User from '../models/User.js';
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
    
    // Try to find user in User model first (for admins/teachers)
    let user = await User.findById(decoded.id).select('-password');
    
    // If not found, try Student model
    if (!user) {
      user = await Student.findById(decoded.id).select('-password');
    }
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

// Middleware for role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Check if user has a role field (User model has roles, Student model doesn't)
    if (req.user.role) {
      // User model - check if role matches
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: `Role '${req.user.role}' is not authorized to access this resource` 
        });
      }
    } else {
      // Student model - only allow if 'student' role is in allowed roles
      if (!roles.includes('student')) {
        return res.status(403).json({ 
          message: 'Students are not authorized to access this resource' 
        });
      }
    }
    
    next();
  };
};