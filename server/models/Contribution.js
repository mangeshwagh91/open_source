import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', index: true },
  githubLogin: { type: String, required: true, index: true },
  repo: { type: String, required: true, index: true }, // owner/repo
  prNumber: { type: Number, required: true },
  title: { type: String },
  url: { type: String, required: true },
  status: { type: String, enum: ['open', 'closed', 'merged'], required: true },
  labels: { type: [String], default: [] },
  points: { type: Number, default: 0 },
  createdAtGitHub: { type: Date },
  updatedAtGitHub: { type: Date },
  mergedAtGitHub: { type: Date },
}, { timestamps: true });

contributionSchema.index({ repo: 1, prNumber: 1 }, { unique: true });

const Contribution = mongoose.model('Contribution', contributionSchema);
export default Contribution;
