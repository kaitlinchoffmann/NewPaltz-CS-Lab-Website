import apiClient from './apiClient';

//handles all authentication-related tasks

const authService = {

  //handles user login
  async login(credentials) {
    try {
      console.log('Attempting login with:', credentials);

      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        console.log('Login successful');
        return response.data;
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  //handles logout
  logout() {
    localStorage.removeItem('adminToken');
    console.log('Logged out successfully');
  },

  //checks if user is logged in
  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  },

  getToken() {
    return localStorage.getItem('adminToken');
  }
  
};

export default authService;