import Student from '../models/Student.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

// @desc    Get all students with pagination, filtering, sorting
// @route   GET /api/students
// @access  Private (Admin only)
export const getStudents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || 'name';
  const { passingYear, department, status, search } = req.query;

  let query = {};

  if (passingYear) query.passingYear = parseInt(passingYear);
  if (department) query.department = department;
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { studentId: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const students = await Student.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Student.countDocuments(query);

  res.json({
    students,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalStudents: count,
      hasNext: page * limit < count,
      hasPrev: page > 1
    }
  });
});

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private (Admin only)
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

// @desc    Create new student
// @route   POST /api/students
// @access  Private (Admin only)
export const createStudent = asyncHandler(async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private (Admin only)
export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin only)
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json({ message: 'Student deleted successfully' });
});

// @desc    Get students by passing year
// @route   GET /api/students/year/:year
// @access  Private (Admin only)
export const getStudentsByYear = asyncHandler(async (req, res) => {
  const students = await Student.find({ passingYear: parseInt(req.params.year) }).sort({ name: 1 });
  res.json(students);
});
