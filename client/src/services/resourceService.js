import apiClient from './apiClient';

const resourceService = {
  async getAllResources() {
    try {
      const response = await apiClient.get('/student-resources'); // Changed from /api/student-resources to match backend
      console.log('Resources response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw new Error('Failed to load resource data');
    }
  }
};

export default resourceService;