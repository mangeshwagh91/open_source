import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}, { _id: false });

const stepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  resources: [resourceSchema]
}, { _id: false });

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Roadmap title is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Roadmap description is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [true, 'Difficulty level is required']
  },
  steps: {
    type: [stepSchema],
    required: [true, 'Steps are required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one step must be specified'
    }
  }
}, {
  timestamps: true
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;
