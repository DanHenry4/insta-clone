// src/api.js
// Centralized API utility for backend integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'; // Change as needed

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    credentials: 'include', // for cookies if needed
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

// Example: export function login(data) { return apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }); }
