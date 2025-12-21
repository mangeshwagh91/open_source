import AcademicProposal from '../models/AcademicProposal.js';
import ProjectAssignment from '../models/ProjectAssignment.js';
import Student from '../models/Student.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';
import { sendEmail } from '../utils/emailService.js';

// @desc    Get all academic proposals (for mentors)
// @route   GET /api/academic-proposals
// @access  Private (Mentor/Admin only)
export const getAcademicProposals = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  let query = {};
  if (status && status !== 'all') query.status = status;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const proposals = await AcademicProposal.find(query)
    .populate('proposedBy', 'name studentId email department passingYear avatar')
    .populate('reviewedBy', 'name email')
    .sort({ createdAt: -1 });

  res.json({ proposals });
});

// @desc    Get proposals by student
// @route   GET /api/academic-proposals/student/:studentId
// @access  Private
export const getProposalsByStudent = asyncHandler(async (req, res) => {
  const proposals = await AcademicProposal.find({ proposedBy: req.params.studentId })
    .populate('reviewedBy', 'name email')
    .sort({ createdAt: -1 });

  res.json({ proposals });
});

// @desc    Create academic proposal
// @route   POST /api/academic-proposals
// @access  Private (Student only)
export const createAcademicProposal = asyncHandler(async (req, res) => {
  const proposal = await AcademicProposal.create(req.body);
  const populatedProposal = await AcademicProposal.findById(proposal._id)
    .populate('proposedBy', 'name studentId email department passingYear avatar');

  res.status(201).json(populatedProposal);
});

// @desc    Accept academic proposal
// @route   PUT /api/academic-proposals/:id/accept
// @access  Private (Mentor/Admin only)
export const acceptProposal = asyncHandler(async (req, res) => {
  const proposal = await AcademicProposal.findById(req.params.id)
    .populate('proposedBy', 'name studentId email department passingYear');

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  if (proposal.status !== 'pending') {
    return res.status(400).json({ message: 'Proposal has already been reviewed' });
  }

  const { mentorFeedback, dueDate, priority = 'medium' } = req.body;

  // Create academic project assignment
  const assignment = await ProjectAssignment.create({
    title: proposal.title,
    subject: proposal.subject,
    description: proposal.description,
    techStack: proposal.techStack,
    githubRepo: proposal.githubRepo,
    assignedTo: [proposal.proposedBy._id],
    assignedBy: req.user.name,
    dueDate: dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    priority: priority,
    status: 'pending',
    isGroupProject: false
  });

  // Update proposal
  proposal.status = 'accepted';
  proposal.reviewedBy = req.user._id;
  proposal.reviewedAt = new Date();
  proposal.mentorFeedback = mentorFeedback;
  proposal.assignedProjectId = assignment._id;
  await proposal.save();

  // Send acceptance email
  try {
    await sendEmail({
      to: proposal.proposedBy.email,
      subject: '🎉 Your Academic Project Proposal has been Accepted!',
      html: `
        <h2>Congratulations ${proposal.proposedBy.name}!</h2>
        <p>Your project proposal "<strong>${proposal.title}</strong>" has been accepted by ${req.user.name}.</p>
        
        ${mentorFeedback ? `<p><strong>Mentor's Feedback:</strong></p><p>${mentorFeedback}</p>` : ''}
        
        <p><strong>Project Details:</strong></p>
        <ul>
          <li>Subject: ${proposal.subject}</li>
          <li>Due Date: ${new Date(assignment.dueDate).toLocaleDateString()}</li>
          <li>Priority: ${priority}</li>
        </ul>
        
        <p>You can now view this project in your Academics page. Good luck!</p>
        
        <p>Best regards,<br>${req.user.name}</p>
      `
    });
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
  }

  res.json({ 
    message: 'Proposal accepted and project assigned',
    proposal,
    assignment
  });
});

// @desc    Reject academic proposal
// @route   PUT /api/academic-proposals/:id/reject
// @access  Private (Mentor/Admin only)
export const rejectProposal = asyncHandler(async (req, res) => {
  const proposal = await AcademicProposal.findById(req.params.id)
    .populate('proposedBy', 'name studentId email department passingYear');

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  if (proposal.status !== 'pending') {
    return res.status(400).json({ message: 'Proposal has already been reviewed' });
  }

  const { rejectionReason, mentorFeedback } = req.body;

  proposal.status = 'rejected';
  proposal.reviewedBy = req.user._id;
  proposal.reviewedAt = new Date();
  proposal.rejectionReason = rejectionReason;
  proposal.mentorFeedback = mentorFeedback;
  await proposal.save();

  // Send rejection email (humble tone)
  try {
    await sendEmail({
      to: proposal.proposedBy.email,
      subject: 'Update on Your Academic Project Proposal',
      html: `
        <h2>Hello ${proposal.proposedBy.name},</h2>
        <p>Thank you for submitting your project proposal "<strong>${proposal.title}</strong>".</p>
        
        <p>After careful consideration, we are unable to approve this proposal at this time.</p>
        
        ${rejectionReason ? `<p><strong>Reason:</strong></p><p>${rejectionReason}</p>` : ''}
        
        ${mentorFeedback ? `<p><strong>Mentor's Feedback:</strong></p><p>${mentorFeedback}</p>` : ''}
        
        <p>We encourage you to refine your proposal based on the feedback and submit again. We appreciate your enthusiasm and look forward to seeing your future proposals.</p>
        
        <p>Keep learning and growing!</p>
        
        <p>Best regards,<br>${req.user.name}</p>
      `
    });
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
  }

  res.json({ 
    message: 'Proposal rejected',
    proposal
  });
});

// @desc    Get single proposal
// @route   GET /api/academic-proposals/:id
// @access  Private
export const getProposalById = asyncHandler(async (req, res) => {
  const proposal = await AcademicProposal.findById(req.params.id)
    .populate('proposedBy', 'name studentId email department passingYear avatar')
    .populate('reviewedBy', 'name email');

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  res.json(proposal);
});

// @desc    Delete proposal
// @route   DELETE /api/academic-proposals/:id
// @access  Private (Student who created it or Admin)
export const deleteProposal = asyncHandler(async (req, res) => {
  const proposal = await AcademicProposal.findById(req.params.id);

  if (!proposal) {
    return res.status(404).json({ message: 'Proposal not found' });
  }

  // Check if user is the owner or admin
  if (proposal.proposedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this proposal' });
  }

  await proposal.deleteOne();

  res.json({ message: 'Proposal deleted successfully' });
});
