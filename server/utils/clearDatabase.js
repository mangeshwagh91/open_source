import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Certificate from '../models/Certificate.js';
import Leaderboard from '../models/Leaderboard.js';
import Project from '../models/Project.js';
import Roadmap from '../models/Roadmap.js';
import Student from '../models/Student.js';
import ProjectAssignment from '../models/ProjectAssignment.js';
import Contribution from '../models/Contribution.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';
import ProjectProposal from '../models/ProjectProposal.js';
import AcademicProposal from '../models/AcademicProposal.js';
import connectDB from '../config/database.js';

// Load env vars
dotenv.config();

const clearDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing database collections...');

    // Delete all documents from all collections
    await Certificate.deleteMany({});
    await Leaderboard.deleteMany({});
    await Project.deleteMany({});
    await Roadmap.deleteMany({});
    await Student.deleteMany({});
    await ProjectAssignment.deleteMany({});
    await Contribution.deleteMany({});
    await Contact.deleteMany({});
    await User.deleteMany({});
    await ProjectProposal.deleteMany({});
    await AcademicProposal.deleteMany({});

    console.log('✅ Database cleared successfully!');
    console.log('All collections are now empty and ready for production.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
