import ProjectAssignment from '../models/ProjectAssignment.js';

// @desc    Get all project assignments
// @route   GET /api/assignments
// @access  Public
export const getAssignments = async (req, res) => {
  try {
    const { status, assignedBy } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (assignedBy) query.assignedBy = assignedBy;
    
    const assignments = await ProjectAssignment.find(query)
      .populate('assignedTo', 'name studentId class email avatar')
      .sort({ createdAt: -1 });
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single assignment
// @route   GET /api/assignments/:id
// @access  Public
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await ProjectAssignment.findById(req.params.id)
      .populate('assignedTo', 'name studentId class email avatar');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new assignment
// @route   POST /api/assignments
// @access  Public
export const createAssignment = async (req, res) => {
  try {
    const assignment = await ProjectAssignment.create(req.body);
    const populatedAssignment = await ProjectAssignment.findById(assignment._id)
      .populate('assignedTo', 'name studentId class email avatar');
    
    res.status(201).json(populatedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update assignment
// @route   PUT /api/assignments/:id
// @access  Public
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await ProjectAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name studentId class email avatar');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Public
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await ProjectAssignment.findByIdAndDelete(req.params.id);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get assignments for a specific student
// @route   GET /api/assignments/student/:studentId
// @access  Public
export const getAssignmentsByStudent = async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find({ 
      assignedTo: req.params.studentId 
    }).populate('assignedTo', 'name studentId class email avatar');
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
