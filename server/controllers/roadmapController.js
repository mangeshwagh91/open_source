import Roadmap from '../models/Roadmap.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

// @desc    Get all roadmaps with pagination, filtering, sorting
// @route   GET /api/roadmaps
// @access  Public
export const getRoadmaps = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || '-createdAt';
  const { difficulty, search } = req.query;

  let query = {};

  if (difficulty) query.difficulty = difficulty;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const roadmaps = await Roadmap.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Roadmap.countDocuments(query);

  res.json({
    roadmaps,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalRoadmaps: count,
      hasNext: page * limit < count,
      hasPrev: page > 1
    }
  });
});

// @desc    Get single roadmap
// @route   GET /api/roadmaps/:id
// @access  Public
export const getRoadmapById = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (!roadmap) {
    return res.status(404).json({ message: 'Roadmap not found' });
  }

  res.json(roadmap);
});

// @desc    Create new roadmap
// @route   POST /api/roadmaps
// @access  Private (Admin only)
export const createRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.create(req.body);
  res.status(201).json(roadmap);
});

// @desc    Update roadmap
// @route   PUT /api/roadmaps/:id
// @access  Private (Admin only)
export const updateRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!roadmap) {
    return res.status(404).json({ message: 'Roadmap not found' });
  }

  res.json(roadmap);
});

// @desc    Delete roadmap
// @route   DELETE /api/roadmaps/:id
// @access  Private (Admin only)
export const deleteRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findByIdAndDelete(req.params.id);

  if (!roadmap) {
    return res.status(404).json({ message: 'Roadmap not found' });
  }

  res.json({ message: 'Roadmap deleted successfully' });
});
