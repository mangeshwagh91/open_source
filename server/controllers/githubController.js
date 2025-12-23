import { asyncHandler } from '../middleware/validationMiddleware.js';
import { rebuildLeaderboardFromContributions } from '../services/leaderboardService.js';
import { syncRepoPRs, verifyGitHubSignature, getGitHubHeaders, parseRepoUrl } from '../services/githubService.js';

export const syncRepository = asyncHandler(async (req, res) => {
  const repoUrl = req.body.repoUrl || req.query.repoUrl || req.body.repo || req.query.repo;
  if (!repoUrl) {
    return res.status(400).json({ message: 'repoUrl is required' });
  }

  const result = await syncRepoPRs(repoUrl);
  const lb = await rebuildLeaderboardFromContributions();
  res.json({ message: 'Sync completed', repo: `${result.owner}/${result.repo}`, prsProcessed: result.count, upserted: result.upserted, leaderboardUpdated: lb.total });
});

export const githubWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payloadRaw = req.rawBody || JSON.stringify(req.body);
  const valid = verifyGitHubSignature(payloadRaw, signature);
  if (!valid) return res.status(401).json({ message: 'Invalid signature' });

  const event = req.headers['x-github-event'];
  if (event !== 'pull_request') {
    return res.status(200).json({ message: 'Event ignored' });
  }

  const repo = req.body?.repository?.full_name; // owner/repo
  const prNumber = req.body?.pull_request?.number;
  if (!repo || !prNumber) return res.status(400).json({ message: 'Invalid webhook payload' });

  // Simple approach: re-sync this repo to capture latest PR changes
  const result = await syncRepoPRs(repo);
  const lb = await rebuildLeaderboardFromContributions();
  res.json({ message: 'Webhook sync completed', repo, prsProcessed: result.count, upserted: result.upserted, leaderboardUpdated: lb.total });
});

// Fetch public repo data (proxy for frontend)
export const getRepoData = asyncHandler(async (req, res) => {
  const repoUrl = req.query.repoUrl || req.query.repo;
  if (!repoUrl) {
    return res.status(400).json({ message: 'repoUrl is required' });
  }
  // Parse owner/repo
  let owner, repo;
  try {
    ({ owner, repo } = await parseRepoUrl(repoUrl));
  } catch (e) {
    return res.status(400).json({ message: 'Invalid repoUrl' });
  }
  // Fetch repo data from GitHub
  const headers = await getGitHubHeaders();
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const response = await fetch(apiUrl, { headers });
  if (!response.ok) {
    const text = await response.text();
    return res.status(response.status).json({ message: 'GitHub API error', details: text });
  }
  const data = await response.json();
  res.json({
    stars: data.stargazers_count || 0,
    forks: data.forks_count || 0,
    watchers: data.watchers_count || 0,
    updatedAt: data.updated_at,
    full: data
  });
});
