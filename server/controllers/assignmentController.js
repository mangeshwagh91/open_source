import ProjectAssignment from '../models/ProjectAssignment.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

// @desc    Get all project assignments with pagination, filtering
// @route   GET /api/assignments
// @access  Private (Admin only)
export const getAssignments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { status, assignedBy, search } = req.query;

  let query = {};
  if (status) query.status = status;
  if (assignedBy) query.assignedBy = assignedBy;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } }
    ];
  }

  const assignments = await ProjectAssignment.find(query)
    .populate('assignedTo', 'name studentId class email avatar')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await ProjectAssignment.countDocuments(query);

  res.json({
    assignments,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalAssignments: count,
      hasNext: page * limit < count,
      hasPrev: page > 1
    }
  });
});

// @desc    Get single assignment
// @route   GET /api/assignments/:id
// @access  Private (Admin only)
export const getAssignmentById = asyncHandler(async (req, res) => {
  const assignment = await ProjectAssignment.findById(req.params.id)
    .populate('assignedTo', 'name studentId class email avatar');

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  res.json(assignment);
});

// @desc    Create new assignment
// @route   POST /api/assignments
// @access  Private (Admin only)
export const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await ProjectAssignment.create(req.body);
  const populatedAssignment = await ProjectAssignment.findById(assignment._id)
    .populate('assignedTo', 'name studentId class email avatar');

  res.status(201).json(populatedAssignment);
});

// @desc    Update assignment
// @route   PUT /api/assignments/:id
// @access  Private (Admin only)
export const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await ProjectAssignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('assignedTo', 'name studentId class email avatar');

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  res.json(assignment);
});

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private (Admin only)
export const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await ProjectAssignment.findByIdAndDelete(req.params.id);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  res.json({ message: 'Assignment deleted successfully' });
});

// @desc    Get assignments for a specific student
// @route   GET /api/assignments/student/:studentId
// @access  Private (Admin only)
export const getAssignmentsByStudent = asyncHandler(async (req, res) => {
  const assignments = await ProjectAssignment.find({
    assignedTo: req.params.studentId
  }).populate('assignedTo', 'name studentId class email avatar');

  res.json(assignments);
});
