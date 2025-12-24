import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'College ID is required'],
    unique: true,
    trim: true,
    match: [/^BT\d{2}[A-Z]\d{2}[A-Z]\d{3}$/, 'Invalid College ID format (e.g., BT23F01F001)']
  },
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Computer Science', 'Information Technology', 'Electronics and Telecommunication', 'Electrical', 'Mechanical', 'Civil' , 'Others']
  },
  passingYear: {
    type: Number,
    required: [true, 'Passing year is required'],
    min: 2000,
    max: 2100
  },
  github: {
    type: String,
    required: [true, 'GitHub profile is required'],
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  avatar: {
    type: String,
    default: function() {
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.name}`;
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Add indexes for faster queries
studentSchema.index({ studentId: 1 });
studentSchema.index({ email: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ department: 1 });
studentSchema.index({ createdAt: -1 });

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
studentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate reset token
studentSchema.methods.getResetPasswordToken = function() {
  // Generate 6-digit code
  const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Hash and set to resetPasswordToken
  this.resetPasswordToken = resetToken;
  
  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
};

const Student = mongoose.model('Student', studentSchema);

export default Student;
