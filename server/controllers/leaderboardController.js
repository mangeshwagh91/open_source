import Leaderboard from '../models/Leaderboard.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

// @desc    Get all leaderboard entries with pagination, filtering, sorting
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || 'points';
  const { search } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } }
    ];
  }

  const leaderboard = await Leaderboard.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Leaderboard.countDocuments(query);

  res.json({
    leaderboard,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalEntries: count,
      hasNext: page * limit < count,
      hasPrev: page > 1
    }
  });
});

// @desc    Get single leaderboard entry
// @route   GET /api/leaderboard/:id
// @access  Public
export const getLeaderboardById = asyncHandler(async (req, res) => {
  const entry = await Leaderboard.findById(req.params.id);

  if (!entry) {
    return res.status(404).json({ message: 'Leaderboard entry not found' });
  }

  res.json(entry);
});

// @desc    Create new leaderboard entry
// @route   POST /api/leaderboard
// @access  Private (Admin only)
export const createLeaderboardEntry = asyncHandler(async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

// @desc    Update leaderboard entry
// @route   PUT /api/leaderboard/:id
// @access  Private (Admin only)
export const updateLeaderboardEntry = asyncHandler(async (req, res) => {
  const entry = await Leaderboard.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!entry) {
    return res.status(404).json({ message: 'Leaderboard entry not found' });
  }

  res.json(entry);
});

// @desc    Delete leaderboard entry
// @route   DELETE /api/leaderboard/:id
// @access  Private (Admin only)
export const deleteLeaderboardEntry = asyncHandler(async (req, res) => {
  const entry = await Leaderboard.findByIdAndDelete(req.params.id);

  if (!entry) {
    return res.status(404).json({ message: 'Leaderboard entry not found' });
  }

  res.json({ message: 'Leaderboard entry deleted successfully' });
});
