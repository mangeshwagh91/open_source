import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true
  },
  recipient: {
    type: String,
    required: [true, 'Recipient name is required'],
    trim: true
  },
  issueDate: {
    type: String,
    required: [true, 'Issue date is required']
  },
  type: {
    type: String,
    enum: ['participation', 'topper', 'mentor', 'completion'],
    required: [true, 'Certificate type is required']
  },
  downloadUrl: {
    type: String,
    default: '#'
  }
}, {
  timestamps: true
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
