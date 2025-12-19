import ProjectProposal from '../models/ProjectProposal.js';
import Project from '../models/Project.js';
import Student from '../models/Student.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';
import { sendProposalAcceptanceEmail, sendProposalRejectionEmail } from '../utils/emailService.js';

// @desc    Get all proposals (with filters)
// @route   GET /api/proposals
// @access  Private
export const getProposals = asyncHandler(async (req, res) => {
  const { status, category, difficulty } = req.query;
  
  const query = {};
  if (status) query.status = status;
  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;

  const proposals = await ProjectProposal.find(query)
    .populate('proposedBy', 'name email studentId avatar')
    .sort('-createdAt');

  res.json({
    success: true,
    count: proposals.length,
    proposals
  });
});

// @desc    Get single proposal by ID
// @route   GET /api/proposals/:id
// @access  Private
export const getProposalById = asyncHandler(async (req, res) => {
  const proposal = await ProjectProposal.findById(req.params.id)
    .populate('proposedBy', 'name email studentId avatar github linkedin');

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  res.json({
    success: true,
    proposal
  });
});

// @desc    Get proposals by current user
// @route   GET /api/proposals/my-proposals
// @access  Private
export const getMyProposals = asyncHandler(async (req, res) => {
  const proposals = await ProjectProposal.find({ proposedBy: req.user._id })
    .sort('-createdAt');

  res.json({
    success: true,
    count: proposals.length,
    proposals
  });
});

// @desc    Create new proposal
// @route   POST /api/proposals
// @access  Private
export const createProposal = asyncHandler(async (req, res) => {
  // Check rate limit: max 3 proposals per week
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentProposals = await ProjectProposal.countDocuments({
    proposedBy: req.user._id,
    createdAt: { $gte: oneWeekAgo }
  });

  if (recentProposals >= 3) {
    return res.status(429).json({ 
      message: 'You can only submit 3 proposals per week. Please try again later.' 
    });
  }

  // Check for duplicate title
  const existingProposal = await ProjectProposal.findOne({ 
    title: req.body.title,
    status: { $in: ['pending', 'accepted'] }
  });

  if (existingProposal) {
    return res.status(400).json({ 
      message: 'A proposal with this title already exists' 
    });
  }

  const proposal = await ProjectProposal.create({
    ...req.body,
    proposedBy: req.user._id
  });

  const populatedProposal = await ProjectProposal.findById(proposal._id)
    .populate('proposedBy', 'name email studentId avatar');

  res.status(201).json({
    success: true,
    message: 'Proposal submitted successfully',
    proposal: populatedProposal
  });
});

// @desc    Update proposal (only if pending)
// @route   PUT /api/proposals/:id
// @access  Private
export const updateProposal = asyncHandler(async (req, res) => {
  let proposal = await ProjectProposal.findById(req.params.id);

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  // Check ownership
  if (proposal.proposedBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this proposal' });
  }

  // Can only update if pending
  if (proposal.status !== 'pending') {
    return res.status(400).json({ 
      message: `Cannot update ${proposal.status} proposals` 
    });
  }

  proposal = await ProjectProposal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('proposedBy', 'name email studentId avatar');

  res.json({
    success: true,
    message: 'Proposal updated successfully',
    proposal
  });
});

// @desc    Delete proposal (only if pending)
// @route   DELETE /api/proposals/:id
// @access  Private
export const deleteProposal = asyncHandler(async (req, res) => {
  const proposal = await ProjectProposal.findById(req.params.id);

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  // Check ownership
  if (proposal.proposedBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to delete this proposal' });
  }

  // Can only delete if pending
  if (proposal.status !== 'pending') {
    return res.status(400).json({ 
      message: `Cannot delete ${proposal.status} proposals` 
    });
  }

  await proposal.deleteOne();

  res.json({
    success: true,
    message: 'Proposal deleted successfully'
  });
});

// @desc    Accept proposal (Faculty/Admin only)
// @route   POST /api/proposals/:id/accept
// @access  Private (Admin)
export const acceptProposal = asyncHandler(async (req, res) => {
  const { facultyFeedback, reviewerName } = req.body;

  const proposal = await ProjectProposal.findById(req.params.id)
    .populate('proposedBy', 'name email studentId');

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  if (proposal.status !== 'pending') {
    return res.status(400).json({ 
      message: `Proposal is already ${proposal.status}` 
    });
  }

  // Create project from accepted proposal
  const project = await Project.create({
    title: proposal.title,
    description: proposal.description,
    category: proposal.category,
    techStack: proposal.techStack,
    difficulty: proposal.difficulty,
    githubLink: proposal.githubRepo,
    duration: `${proposal.expectedDuration} weeks`,
    teamSize: proposal.maxTeamSize,
    prerequisites: proposal.prerequisites,
    learningObjectives: proposal.learningObjectives,
    status: 'open'
  });

  // Update proposal status
  proposal.status = 'accepted';
  proposal.reviewedBy = reviewerName || 'Faculty';
  proposal.reviewedAt = Date.now();
  proposal.facultyFeedback = facultyFeedback || '';
  proposal.publishedProjectId = project._id;
  await proposal.save();

  // Send acceptance email
  try {
    await sendProposalAcceptanceEmail(
      proposal.proposedBy.email,
      proposal.proposedBy.name,
      proposal.title,
      facultyFeedback,
      project._id.toString()
    );
  } catch (error) {
    console.error('Failed to send acceptance email:', error);
  }

  res.json({
    success: true,
    message: 'Proposal accepted and published successfully',
    proposal,
    project
  });
});

// @desc    Reject proposal (Faculty/Admin only)
// @route   POST /api/proposals/:id/reject
// @access  Private (Admin)
export const rejectProposal = asyncHandler(async (req, res) => {
  const { rejectionReason, reviewerName } = req.body;

  if (!rejectionReason) {
    return res.status(400).json({ 
      message: 'Rejection reason is required' 
    });
  }

  const proposal = await ProjectProposal.findById(req.params.id)
    .populate('proposedBy', 'name email studentId');

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  if (proposal.status !== 'pending') {
    return res.status(400).json({ 
      message: `Proposal is already ${proposal.status}` 
    });
  }

  // Update proposal status
  proposal.status = 'rejected';
  proposal.reviewedBy = reviewerName || 'Faculty';
  proposal.reviewedAt = Date.now();
  proposal.rejectionReason = rejectionReason;
  await proposal.save();

  // Send rejection email
  try {
    await sendProposalRejectionEmail(
      proposal.proposedBy.email,
      proposal.proposedBy.name,
      proposal.title,
      rejectionReason
    );
  } catch (error) {
    console.error('Failed to send rejection email:', error);
  }

  res.json({
    success: true,
    message: 'Proposal rejected',
    proposal
  });
});

// @desc    Get proposal statistics
// @route   GET /api/proposals/stats
// @access  Private (Admin)
export const getProposalStats = asyncHandler(async (req, res) => {
  const totalProposals = await ProjectProposal.countDocuments();
  const pendingProposals = await ProjectProposal.countDocuments({ status: 'pending' });
  const acceptedProposals = await ProjectProposal.countDocuments({ status: 'accepted' });
  const rejectedProposals = await ProjectProposal.countDocuments({ status: 'rejected' });

  const acceptanceRate = totalProposals > 0 
    ? ((acceptedProposals / totalProposals) * 100).toFixed(1) 
    : 0;

  res.json({
    success: true,
    stats: {
      total: totalProposals,
      pending: pendingProposals,
      accepted: acceptedProposals,
      rejected: rejectedProposals,
      acceptanceRate: `${acceptanceRate}%`
    }
  });
});
