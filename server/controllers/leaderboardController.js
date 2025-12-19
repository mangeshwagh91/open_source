import Leaderboard from '../models/Leaderboard.js';

// @desc    Get all leaderboard entries
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single leaderboard entry
// @route   GET /api/leaderboard/:id
// @access  Public
export const getLeaderboardById = async (req, res) => {
  try {
    const entry = await Leaderboard.findById(req.params.id);
    
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new leaderboard entry
// @route   POST /api/leaderboard
// @access  Public
export const createLeaderboardEntry = async (req, res) => {
  try {
    const entry = await Leaderboard.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update leaderboard entry
// @route   PUT /api/leaderboard/:id
// @access  Public
export const updateLeaderboardEntry = async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete leaderboard entry
// @route   DELETE /api/leaderboard/:id
// @access  Public
export const deleteLeaderboardEntry = async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    
    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }
    
    res.json({ message: 'Leaderboard entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
