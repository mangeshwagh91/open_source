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
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
import academicProposalRoutes from './routes/academicProposalRoutes.js';
import githubRoutes from './routes/githubRoutes.js';
import contributionRoutes from './routes/contributionRoutes.js';
import cron from 'node-cron';

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

// Auth rate limiting (stricter for auth endpoints)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts, please try again later.'
    });
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Open Source Project API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      certificates: '/api/certificates',
      leaderboard: '/api/leaderboard',
      contacts: '/api/contacts',
      projects: '/api/projects',
      roadmaps: '/api/roadmaps',
      students: '/api/students',
      assignments: '/api/assignments',
      proposals: '/api/proposals',
      academicProposals: '/api/academic-proposals',
      github: '/api/github',
      contributions: '/api/contributions'
    }
  });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/academic-proposals', academicProposalRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/contributions', contributionRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  
  // Cron: auto-sync ALL project repos every hour (initialize after server starts)
  import('./services/githubService.js').then(({ syncRepoPRs }) => {
    import('./services/leaderboardService.js').then(({ rebuildLeaderboardFromContributions }) => {
      import('./models/Project.js').then(({ default: Project }) => {
        cron.schedule('0 * * * *', async () => {
          try {
            console.log('[Cron] GitHub sync starting...');
            
            // Fetch all projects with GitHub repos
            const projects = await Project.find({ githubRepo: { $exists: true, $ne: '' } }).select('githubRepo name');
            console.log(`[Cron] Found ${projects.length} projects to sync`);
            
            // Sync each project's GitHub repo
            for (const project of projects) {
              try {
                console.log(`[Cron] Syncing ${project.name}: ${project.githubRepo}`);
                await syncRepoPRs(project.githubRepo);
              } catch (err) {
                console.error(`[Cron] Failed to sync ${project.name}:`, err.message);
              }
            }
            
            // Rebuild leaderboard with all contributions
            await rebuildLeaderboardFromContributions();
            console.log('[Cron] GitHub sync completed.');
          } catch (err) {
            console.error('[Cron] GitHub sync failed:', err.message);
          }
        });
        console.log('[Cron] Scheduled hourly auto-sync for all project repositories');
      });
    });
  });
});

export default app;
