import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  techStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one technology must be specified'
    }
  },
  adminName: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true
  },
  githubRepo: {
    type: String,
    required: [true, 'GitHub repository URL is required'],
    trim: true
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
