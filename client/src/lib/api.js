const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Certificates API
export const certificatesAPI = {
  getAll: () => fetchAPI('/certificates'),
  getById: (id) => fetchAPI(`/certificates/${id}`),
  create: (data) => fetchAPI('/certificates', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/certificates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/certificates/${id}`, {
    method: 'DELETE',
  }),
};

// Leaderboard API
export const leaderboardAPI = {
  getAll: () => fetchAPI('/leaderboard'),
  getById: (id) => fetchAPI(`/leaderboard/${id}`),
  create: (data) => fetchAPI('/leaderboard', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/leaderboard/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/leaderboard/${id}`, {
    method: 'DELETE',
  }),
};

// Contact API
export const contactAPI = {
  getAll: () => fetchAPI('/contacts'),
  getById: (id) => fetchAPI(`/contacts/${id}`),
  create: (data) => fetchAPI('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/contacts/${id}`, {
    method: 'DELETE',
  }),
};

// Projects API
export const projectsAPI = {
  getAll: () => fetchAPI('/projects'),
  getById: (id) => fetchAPI(`/projects/${id}`),
  create: (data) => fetchAPI('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Roadmaps API
export const roadmapsAPI = {
  getAll: () => fetchAPI('/roadmaps'),
  getById: (id) => fetchAPI(`/roadmaps/${id}`),
  create: (data) => fetchAPI('/roadmaps', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`/roadmaps/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`/roadmaps/${id}`, {
    method: 'DELETE',
  }),
};
