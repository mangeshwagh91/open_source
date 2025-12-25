// Fetch GitHub repository stats (stars, forks, views)
export const fetchRepoStats = async (repoUrlOrSlug) => {
  const { owner, repo } = parseRepoUrl(repoUrlOrSlug);
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
  const res = await fetch(url, { headers: getGitHubHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${body}`);
  }
  const data = await res.json();
  // Views require a separate API call (traffic/views), which needs repo admin token
  let views = null;
  try {
    const viewsRes = await fetch(`${url}/traffic/views`, { headers: getGitHubHeaders() });
    if (viewsRes.ok) {
      const viewsData = await viewsRes.json();
      views = viewsData.count || 0;
    }
  } catch {}
  return {
    stars: data.stargazers_count || 0,
    forks: data.forks_count || 0,
    views,
    updatedAt: data.updated_at || null,
  };
};
import crypto from 'crypto';
import Contribution from '../models/Contribution.js';
import Student from '../models/Student.js';

const GITHUB_API_BASE = 'https://api.github.com';

const POINTS_MAP = {
  'Level-1': Number(process.env.GITHUB_POINTS_LEVEL_1 || 10),
  'Level-2': Number(process.env.GITHUB_POINTS_LEVEL_2 || 20),
  'Level-3': Number(process.env.GITHUB_POINTS_LEVEL_3 || 30),
};

export const parseRepoUrl = (repoUrlOrSlug) => {
  // Accepts full URL or owner/repo
  try {
    if (repoUrlOrSlug.includes('://')) {
      const u = new URL(repoUrlOrSlug);
      const parts = u.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) return { owner: parts[0], repo: parts[1] };
    } else {
      const parts = repoUrlOrSlug.split('/');
      if (parts.length === 2) return { owner: parts[0], repo: parts[1] };
    }
  } catch {}
  throw new Error('Invalid repository URL or slug. Expected https://github.com/<owner>/<repo> or <owner>/<repo>.');
};

export const getGitHubHeaders = () => ({
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'GECA-Contrib-Service',
  ...(process.env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

const fetchAllPRs = async (owner, repo) => {
  const prs = [];
  let page = 1;
  while (true) {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=all&per_page=100&page=${page}`;
    const res = await fetch(url, { headers: getGitHubHeaders() });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GitHub API error (${res.status}): ${body}`);
    }
    const batch = await res.json();
    prs.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  return prs;
};

const statusFromPR = (pr) => {
  if (pr.merged_at) return 'merged';
  if (pr.state === 'closed') return 'closed';
  return 'open';
};

const extractLabels = (pr) => pr.labels?.map(l => l.name) || [];

const pointsFromLabels = (labels) => {
  let points = 0;
  for (const label of labels) {
    if (POINTS_MAP[label]) points = Math.max(points, POINTS_MAP[label]);
  }
  return points;
};

const loginFromUser = (user) => user?.login || null;

const usernameFromGitHubUrl = (url) => {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
};

export const syncRepoPRs = async (repoUrlOrSlug) => {
  const { owner, repo } = parseRepoUrl(repoUrlOrSlug);
  const repoKey = `${owner}/${repo}`;
  const prs = await fetchAllPRs(owner, repo);

  // Build student map: github login -> student
  const students = await Student.find({ github: { $exists: true, $ne: '' } }).select('github name avatar _id');
  const loginToStudent = new Map();
  for (const s of students) {
    const login = usernameFromGitHubUrl(s.github);
    if (login) loginToStudent.set(login.toLowerCase(), s);
  }

  let upserted = 0;
  for (const pr of prs) {
    const status = statusFromPR(pr);
    const labels = extractLabels(pr);
    const points = pointsFromLabels(labels);
    const login = loginFromUser(pr.user)?.toLowerCase();
    const student = login ? loginToStudent.get(login) : null;

    const doc = {
      student: student?._id || undefined,
      githubLogin: login || 'unknown',
      repo: repoKey,
      prNumber: pr.number,
      title: pr.title,
      url: pr.html_url,
      status,
      labels,
      points,
      createdAtGitHub: pr.created_at ? new Date(pr.created_at) : undefined,
      updatedAtGitHub: pr.updated_at ? new Date(pr.updated_at) : undefined,
      mergedAtGitHub: pr.merged_at ? new Date(pr.merged_at) : undefined,
    };

    await Contribution.updateOne(
      { repo: repoKey, prNumber: pr.number },
      { $set: doc },
      { upsert: true }
    );
    upserted += 1;
  }

  return { owner, repo, count: prs.length, upserted };
};

export const verifyGitHubSignature = (payload, signature256) => {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) return true; // If no secret configured, skip verification (not recommended in prod)
  const hmac = crypto.createHmac('sha256', secret);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature256 || ''));
};
