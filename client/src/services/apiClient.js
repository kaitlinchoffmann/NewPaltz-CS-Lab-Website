import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('User authenticated'); 
  }
  return config;
});

// Add error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export default apiClient;