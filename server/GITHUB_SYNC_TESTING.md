# GitHub PR Sync - Testing Guide

## Quick Test

Test the GitHub sync manually using curl or Postman. This will sync a public repository and update the leaderboard.

### 1. Manual Sync Test (Admin Required)

```bash
# Test with a public repository (e.g., facebook/react)
curl -X POST http://localhost:5000/api/github/sync \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"repoUrl": "facebook/react"}'
```

**Expected Response:**
```json
{
  "message": "Sync completed",
  "repo": "facebook/react",
  "prsProcessed": 1234,
  "upserted": 1234,
  "leaderboardUpdated": 45
}
```

### 2. Verify Leaderboard

```bash
curl http://localhost:5000/api/leaderboard
```

You should see updated points and contributions based on PR labels.

### 3. GitHub Webhook Setup

Configure a GitHub webhook in your repository settings:

1. Go to: `https://github.com/<owner>/<repo>/settings/hooks`
2. Click "Add webhook"
3. Set Payload URL: `https://your-domain.com/api/github/webhook`
4. Content type: `application/json`
5. Secret: (match your `GITHUB_WEBHOOK_SECRET` in .env)
6. Events: Select "Pull requests"
7. Save

**Test Webhook Locally (with ngrok or similar):**
```bash
# Install ngrok
ngrok http 5000

# Update webhook URL to ngrok URL
# Example: https://abc123.ngrok.io/api/github/webhook
```

### 4. Test Webhook Payload

```bash
curl -X POST http://localhost:5000/api/github/webhook \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: pull_request" \
  -H "X-Hub-Signature-256: sha256=..." \
  -d @webhook-payload.json
```

**Sample webhook-payload.json:**
```json
{
  "action": "opened",
  "pull_request": {
    "number": 123,
    "title": "Add feature X",
    "html_url": "https://github.com/owner/repo/pull/123",
    "state": "open",
    "merged_at": null,
    "user": {
      "login": "githubuser"
    },
    "labels": [
      { "name": "Level-2" }
    ],
    "created_at": "2025-12-20T10:00:00Z",
    "updated_at": "2025-12-20T10:00:00Z"
  },
  "repository": {
    "full_name": "owner/repo"
  }
}
```

## Points System

- **Level-1**: 10 points (configurable via `GITHUB_POINTS_LEVEL_1`)
- **Level-2**: 20 points (configurable via `GITHUB_POINTS_LEVEL_2`)
- **Level-3**: 30 points (configurable via `GITHUB_POINTS_LEVEL_3`)

If a PR has multiple level labels, the highest points value is awarded.

## Student Matching

Students are matched to PR authors by extracting the GitHub username from their `Student.github` field:
- GitHub URL: `https://github.com/johndoe` → username: `johndoe`
- PR author: `user.login` → matched to student if username matches

Ensure students have their GitHub profile URLs properly configured in the database.

## Cron Auto-Sync

To enable hourly auto-sync:

1. Add repositories to `.env`:
   ```env
   GITHUB_TRACKED_REPOS=owner/repo1,owner/repo2
   ```

2. Restart server - cron job will run every hour (0 * * * *)

3. Check logs for sync status:
   ```
   [Cron] GitHub sync starting...
   [Cron] GitHub sync completed.
   ```

## Troubleshooting

### Rate Limiting
- Add `GITHUB_TOKEN` to `.env` for authenticated requests (5000 req/hr)
- Without token: 60 req/hr

### No Students Matched
- Check `Student.github` field format
- Ensure GitHub usernames match PR author logins
- Use case-insensitive matching

### Webhook Signature Verification Failed
- Verify `GITHUB_WEBHOOK_SECRET` matches webhook configuration
- Check `X-Hub-Signature-256` header is present

## Production Checklist

- [ ] Set `GITHUB_TOKEN` with appropriate scopes
- [ ] Configure `GITHUB_WEBHOOK_SECRET` (strong random string)
- [ ] Set up webhook in repository settings
- [ ] Add tracked repositories to `GITHUB_TRACKED_REPOS`
- [ ] Verify SSL/HTTPS for webhook endpoint
- [ ] Test with a sample PR to confirm points calculation
- [ ] Monitor cron job logs
- [ ] Set up error alerting for sync failures
