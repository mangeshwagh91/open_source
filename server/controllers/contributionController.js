import Contribution from '../models/Contribution.js';
import { asyncHandler } from '../middleware/validationMiddleware.js';

// @desc    Get contribution statistics for all projects
// @route   GET /api/contributions/stats
// @access  Public
export const getContributionStats = asyncHandler(async (req, res) => {
  const stats = await Contribution.aggregate([
    {
      $group: {
        _id: '$repo',
        totalContributions: { $sum: 1 },
        totalPoints: { $sum: '$points' },
        uniqueContributors: { $addToSet: '$githubLogin' },
        openPRs: {
          $sum: { $cond: [{ $eq: ['$status', 'open'] }, 1, 0] }
        },
        mergedPRs: {
          $sum: { $cond: [{ $eq: ['$status', 'merged'] }, 1, 0] }
        }
      }
    },
    {
      $project: {
        _id: 0,
        repo: '$_id',
        totalContributions: 1,
        totalPoints: 1,
        contributorCount: { $size: '$uniqueContributors' },
        uniqueContributors: 1,
        openPRs: 1,
        mergedPRs: 1
      }
    }
  ]);

  // Convert to map for easy lookup
  const statsMap = {};
  let allContributors = new Set();
  stats.forEach(stat => {
    statsMap[stat.repo] = stat;
    if (Array.isArray(stat.uniqueContributors)) {
      stat.uniqueContributors.forEach(c => allContributors.add(c));
    }
  });

  res.json({
    ...statsMap,
    totalContributors: allContributors.size
  });
});

// @desc    Get contributions for a specific repository
// @route   GET /api/contributions/repo/:owner/:repo
// @access  Public
export const getRepoContributions = asyncHandler(async (req, res) => {
  const repoKey = `${req.params.owner}/${req.params.repo}`;
  
  const contributions = await Contribution.find({ repo: repoKey })
    .populate('student', 'name avatar github')
    .sort({ createdAtGitHub: -1 })
    .limit(100);

  const stats = await Contribution.aggregate([
    { $match: { repo: repoKey } },
    {
      $group: {
        _id: null,
        totalContributions: { $sum: 1 },
        totalPoints: { $sum: '$points' },
        uniqueContributors: { $addToSet: '$githubLogin' }
      }
    }
  ]);

  res.json({
    repo: repoKey,
    contributions,
    stats: stats[0] || { totalContributions: 0, totalPoints: 0, uniqueContributors: [] }
  });
});

// @desc    Get all contributions with pagination
// @route   GET /api/contributions
// @access  Public
export const getAllContributions = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const { status, repo } = req.query;

  let query = {};
  if (status) query.status = status;
  if (repo) query.repo = repo;

  const contributions = await Contribution.find(query)
    .populate('student', 'name avatar github')
    .sort({ updatedAtGitHub: -1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Contribution.countDocuments(query);

  res.json({
    contributions,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalContributions: count,
      hasNext: page * limit < count,
      hasPrev: page > 1
    }
  });
});
