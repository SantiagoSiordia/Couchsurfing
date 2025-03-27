export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  user: (id: string) => `${API_BASE_URL}/users/${id}`,
} as const; 