import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: [true, 'Rank is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
    min: 0
  },
  avatar: {
    type: String,
    required: [true, 'Avatar URL is required']
  },
  contributions: {
    type: Number,
    required: [true, 'Contributions count is required'],
    min: 0
  },
  badge: {
    type: String,
    enum: ['gold', 'silver', 'bronze', null],
    default: null
  }
}, {
  timestamps: true
});

// Automatically update ranks based on points before saving
leaderboardSchema.pre('save', async function(next) {
  if (this.isModified('points')) {
    const allEntries = await this.constructor.find().sort({ points: -1 });
    allEntries.forEach((entry, index) => {
      entry.rank = index + 1;
    });
  }
  next();
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
