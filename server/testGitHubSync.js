// Test script for GitHub PR sync
// Run with: node testGitHubSync.js

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

// You'll need an admin token - get this by logging in as admin
const ADMIN_TOKEN = 'YOUR_ADMIN_JWT_TOKEN_HERE';

const testSync = async () => {
  try {
    console.log('🚀 Testing GitHub PR Sync...\n');

    // Test with a small public repo (or your own repo)
    const testRepo = 'facebook/react'; // Change to your repo for real test
    
    console.log(`📡 Syncing repository: ${testRepo}`);
    const syncRes = await fetch(`${BASE_URL}/github/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({ repoUrl: testRepo })
    });

    if (!syncRes.ok) {
      const error = await syncRes.text();
      throw new Error(`Sync failed (${syncRes.status}): ${error}`);
    }

    const syncData = await syncRes.json();
    console.log('✅ Sync completed:', syncData);
    console.log(`   - PRs processed: ${syncData.prsProcessed}`);
    console.log(`   - Records upserted: ${syncData.upserted}`);
    console.log(`   - Leaderboard entries: ${syncData.leaderboardUpdated}\n`);

    // Fetch updated leaderboard
    console.log('📊 Fetching updated leaderboard...');
    const lbRes = await fetch(`${BASE_URL}/leaderboard`);
    const lbData = await lbRes.json();
    
    console.log('✅ Leaderboard updated:');
    lbData.leaderboard.slice(0, 5).forEach((entry, idx) => {
      console.log(`   ${idx + 1}. ${entry.name} - ${entry.points} pts (${entry.contributions} contributions)`);
    });

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

// Run test
testSync();
