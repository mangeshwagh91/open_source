import { asyncHandler } from '../middleware/validationMiddleware.js';
import { rebuildLeaderboardFromContributions } from '../services/leaderboardService.js';
import { syncRepoPRs, verifyGitHubSignature } from '../services/githubService.js';

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
