import mongoose from 'mongoose';

const projectProposalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    minlength: [50, 'Description must be at least 50 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['Web Development', 'Mobile Development', 'AI/ML', 'DevOps', 'Blockchain', 'IoT', 'Data Science', 'Cybersecurity', 'Game Development', 'Other']
  },
  techStack: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  githubRepo: {
    type: String,
    required: [true, 'GitHub repository URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+/.test(v);
      },
      message: 'Please provide a valid GitHub repository URL'
    }
  },
  expectedDuration: {
    type: Number,
    required: [true, 'Expected duration is required'],
    min: [1, 'Duration must be at least 1 week'],
    max: [24, 'Duration cannot exceed 24 weeks']
  },
  learningObjectives: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  maxTeamSize: {
    type: Number,
    required: [true, 'Maximum team size is required'],
    min: [1, 'Team size must be at least 1'],
    default: 4
  },
  proposedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  proposerRole: {
    type: String,
    default: 'Contributor',
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  reviewedBy: {
    type: String,
    trim: true
  },
  reviewedAt: {
    type: Date
  },
  facultyFeedback: {
    type: String,
    trim: true,
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  },
  rejectionReason: {
    type: String,
    trim: true,
    maxlength: [500, 'Rejection reason cannot exceed 500 characters']
  },
  publishedProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
}, {
  timestamps: true
});

// Index for efficient queries
projectProposalSchema.index({ status: 1, createdAt: -1 });
projectProposalSchema.index({ proposedBy: 1 });
projectProposalSchema.index({ status: 1, proposedBy: 1 });
projectProposalSchema.index({ category: 1, difficulty: 1 });
projectProposalSchema.index({ createdAt: -1 });

const ProjectProposal = mongoose.model('ProjectProposal', projectProposalSchema);

export default ProjectProposal;
