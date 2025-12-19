import { body, validationResult } from 'express-validator';

// Validation middleware to check validation results
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Certificate validation rules
export const certificateValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('recipient').trim().notEmpty().withMessage('Recipient is required'),
  body('issueDate').trim().notEmpty().withMessage('Issue date is required'),
  body('type').isIn(['participation', 'topper', 'mentor', 'completion']).withMessage('Invalid certificate type'),
];

// Contact validation rules
export const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

// Project validation rules
export const projectValidation = [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('techStack').isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('adminName').trim().notEmpty().withMessage('Admin name is required'),
  body('githubRepo').trim().notEmpty().withMessage('GitHub repository URL is required'),
];

// Roadmap validation rules
export const roadmapValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('difficulty').isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid difficulty level'),
  body('steps').isArray({ min: 1 }).withMessage('At least one step is required'),
];

// Leaderboard validation rules
export const leaderboardValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('points').isInt({ min: 0 }).withMessage('Points must be a non-negative integer'),
  body('avatar').trim().notEmpty().withMessage('Avatar URL is required'),
  body('contributions').isInt({ min: 0 }).withMessage('Contributions must be a non-negative integer'),
];
