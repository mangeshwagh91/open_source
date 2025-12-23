import { useState, useEffect } from 'react';

export const useGithubRepo = (githubUrl) => {
  const [repoData, setRepoData] = useState({
    stars: 0,
    forks: 0,
    watchers: 0,
    updatedAt: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!githubUrl) {
        setRepoData(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        // Call backend proxy endpoint
        const response = await fetch(`/api/github/repo?repoUrl=${encodeURIComponent(githubUrl)}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch repository data');
        }
        const data = await response.json();
        setRepoData({
          stars: data.stars || 0,
          forks: data.forks || 0,
          watchers: data.watchers || 0,
          updatedAt: data.updatedAt,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setRepoData({
          stars: 0,
          forks: 0,
          watchers: 0,
          updatedAt: null,
          loading: false,
          error: error.message
        });
      }
    };

    fetchRepoData();
  }, [githubUrl]);

  return repoData;
};

// Helper function to format numbers (e.g., 2300 -> 2.3k)
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

// Helper function to format relative time
export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
};
