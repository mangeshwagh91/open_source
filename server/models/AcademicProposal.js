import mongoose from 'mongoose';

const academicProposalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  techStack: [{
    type: String,
    trim: true
  }],
  githubRepo: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty
        return /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+/.test(v);
      },
      message: 'Please provide a valid GitHub repository URL'
    }
  },
  expectedDuration: {
    type: String,
    trim: true
  },
  proposedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  proposedTo: {
    type: String, // Mentor name or "Any Mentor"
    default: 'Any Mentor',
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Mentor who reviewed
  },
  reviewedAt: {
    type: Date
  },
  mentorFeedback: {
    type: String,
    trim: true
  },
  rejectionReason: {
    type: String,
    trim: true
  },
  assignedProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectAssignment' // Links to created academic project if accepted
  }
}, {
  timestamps: true
});

// Index for efficient queries
academicProposalSchema.index({ status: 1, createdAt: -1 });
academicProposalSchema.index({ proposedBy: 1 });

const AcademicProposal = mongoose.model('AcademicProposal', academicProposalSchema);

export default AcademicProposal;
