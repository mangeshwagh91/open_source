import Project from '../models/Project.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';
import { syncRepoPRs } from '../services/githubService.js';
import { rebuildLeaderboardFromContributions } from '../services/leaderboardService.js';

// @desc    Get all projects with pagination, filtering, sorting
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const sort = req.query.sort || '-createdAt';
  const search = req.query.search;

  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { techStack: { $in: [new RegExp(search, 'i')] } }
      ]
    };
  }

  const projects = await Project.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Project.countDocuments(query);

  res.json({
    projects,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalProjects: count,
      hasNext: page * limit < count,
      hasPrev: page > 1
    }
  });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json(project);
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin only)
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  
  // Auto-sync GitHub repo if provided
  if (project.githubRepo) {
    try {
      console.log(`[Project Created] Syncing GitHub repo: ${project.githubRepo}`);
      await syncRepoPRs(project.githubRepo);
      await rebuildLeaderboardFromContributions();
      console.log(`[Project Created] GitHub sync completed for ${project.name}`);
    } catch (error) {
      console.error(`[Project Created] GitHub sync failed for ${project.name}:`, error.message);
      // Don't fail project creation if sync fails
    }
  }
  
  res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
export const updateProject = asyncHandler(async (req, res) => {
  const oldProject = await Project.findById(req.params.id);
  
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Auto-sync if GitHub repo was added or changed
  if (project.githubRepo && project.githubRepo !== oldProject?.githubRepo) {
    try {
      console.log(`[Project Updated] Syncing GitHub repo: ${project.githubRepo}`);
      await syncRepoPRs(project.githubRepo);
      await rebuildLeaderboardFromContributions();
      console.log(`[Project Updated] GitHub sync completed for ${project.name}`);
    } catch (error) {
      console.error(`[Project Updated] GitHub sync failed for ${project.name}:`, error.message);
      // Don't fail project update if sync fails
    }
  }

  res.json(project);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json({ message: 'Project deleted successfully' });
});
