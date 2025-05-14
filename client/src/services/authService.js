import apiClient from './apiClient';

//handles all authentication-related tasks

const authService = {

  //handles user login
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  //handles logout
  logout() {
    localStorage.removeItem('adminToken');
  },

  //checks if user is logged in
  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  },

  getToken() {
    return localStorage.getItem('adminToken');
  },
};

export default authService;