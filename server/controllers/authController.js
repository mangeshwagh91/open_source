import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../middleware/validationMiddleware.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

// @desc    Register student
// @route   POST /api/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { studentId, name, email, password, department, passingYear, github, linkedin } = req.body;

  // Check if student exists
  const studentExists = await Student.findOne({ $or: [{ email }, { studentId }] });
  if (studentExists) {
    return res.status(400).json({ 
      message: studentExists.email === email 
        ? 'Email already registered' 
        : 'College ID already registered' 
    });
  }

  // Create student
  const student = await Student.create({
    studentId,
    name,
    email,
    password,
    department,
    passingYear,
    github,
    linkedin: linkedin || ''
  });

  if (student) {
    const token = generateToken(student._id);

    res.status(201).json({
      success: true,
      token,
      student: {
        _id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        department: student.department,
        passingYear: student.passingYear,
        github: student.github,
        linkedin: student.linkedin
      }
    });
  } else {
    res.status(400).json({ message: 'Invalid student data' });
  }
});

// @desc    Authenticate student & get token
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for student
  const student = await Student.findOne({ email }).select('+password');
  
  if (!student) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check password
  const isMatch = await student.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(student._id);

  res.json({
    success: true,
    token,
    student: {
      _id: student._id,
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      department: student.department,
      passingYear: student.passingYear,
      github: student.github,
      linkedin: student.linkedin,
      avatar: student.avatar
    }
  });
});

// @desc    Get current logged in student
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user.id);

  res.json({
    success: true,
    student: {
      _id: student._id,
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      department: student.department,
      passingYear: student.passingYear,
      github: student.github,
      linkedin: student.linkedin,
      avatar: student.avatar,
      status: student.status
    }
  });
});

// @desc    Forgot password - send reset code
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(404).json({ message: 'No account with that email address' });
  }

  // Get reset token (6-digit code)
  const resetToken = student.getResetPasswordToken();

  await student.save({ validateBeforeSave: false });

  try {
    // Send email with reset code
    await sendPasswordResetEmail(email, resetToken, student.name);

    res.json({
      success: true,
      message: 'Password reset code sent to your email'
    });
  } catch (error) {
    // If email fails, clear the reset token
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;
    await student.save({ validateBeforeSave: false });

    console.error('Email error:', error);
    return res.status(500).json({ 
      message: 'Email could not be sent. Please check email configuration.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  const student = await Student.findOne({
    email,
    resetPasswordToken: resetCode,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!student) {
    return res.status(400).json({ message: 'Invalid or expired reset code' });
  }

  // Set new password
  student.password = newPassword;
  student.resetPasswordToken = undefined;
  student.resetPasswordExpire = undefined;

  await student.save();

  const token = generateToken(student._id);

  res.json({
    success: true,
    message: 'Password reset successful',
    token,
    student: {
      _id: student._id,
      studentId: student.studentId,
      name: student.name,
      email: student.email
    }
  });
});