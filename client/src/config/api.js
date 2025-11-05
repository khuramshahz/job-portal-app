// API Configuration
// Use relative URLs if VITE_API_URL is empty or not set (for same-origin deployment)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const api = {
  baseURL: API_BASE_URL,
  endpoints: {
    jobs: `${API_BASE_URL}/api/jobs`,
    users: `${API_BASE_URL}/api/users`,
    applications: `${API_BASE_URL}/api/applications`,
  }
};

export default api;





