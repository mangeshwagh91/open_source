import jwt from 'jsonwebtoken';
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
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
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

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized for this action' });
    }

    next();
  };
};

// Middleware to check if user account is active and not locked
export const checkAccountStatus = asyncHandler(async (req, res, next) => {
  if (!req.user.isActive) {
    return res.status(401).json({ message: 'Account is deactivated' });
  }

  if (req.user.isLocked) {
    return res.status(423).json({ message: 'Account is locked due to too many failed login attempts' });
  }

  next();
});