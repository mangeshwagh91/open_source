import Roadmap from '../models/Roadmap.js';

// @desc    Get all roadmaps
// @route   GET /api/roadmaps
// @access  Public
export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single roadmap
// @route   GET /api/roadmaps/:id
// @access  Public
export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new roadmap
// @route   POST /api/roadmaps
// @access  Public
export const createRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.create(req.body);
    res.status(201).json(roadmap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update roadmap
// @route   PUT /api/roadmaps/:id
// @access  Public
export const updateRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json(roadmap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete roadmap
// @route   DELETE /api/roadmaps/:id
// @access  Public
export const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }
    
    res.json({ message: 'Roadmap deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
