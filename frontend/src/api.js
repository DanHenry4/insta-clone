// src/api.js
// Centralized API utility for backend integration


const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:4000';
const POST_BASE_URL = import.meta.env.VITE_POST_BASE_URL || 'http://localhost:4002';


export async function apiRequest(endpoint, options = {}, baseUrl = AUTH_BASE_URL) {
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API Error');
  }
  return response.json();
}


// Auth requests
export function login(data) {
  return apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }, AUTH_BASE_URL);
}


// Fetch posts (media) from the backend
export async function fetchPosts() {
  return apiRequest('/api/posts', {}, POST_BASE_URL);
}
