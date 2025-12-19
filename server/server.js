import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import { corsOptions, rateLimitOptions } from './config/config.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Import routes
import certificateRoutes from './routes/certificateRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors(corsOptions)); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rate limiting
const limiter = rateLimit(rateLimitOptions);
app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Open Source Project API',
    version: '1.0.0',
    endpoints: {
      certificates: '/api/certificates',
      leaderboard: '/api/leaderboard',
      contacts: '/api/contacts',
      projects: '/api/projects',
      roadmaps: '/api/roadmaps',
      students: '/api/students',
      assignments: '/api/assignments'
    }
  });
});

app.use('/api/certificates', certificateRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/assignments', assignmentRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;
