import axios from 'axios';

const baseURL = '/api/student-resources';

const resourceService = {
  // Fetch all student resources
  async getAllResources() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load resource data');
    }
  },

  // Add a new student resource
  async addResource(resourceData) {
    try {
      const response = await axios.post(baseURL, resourceData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add resource');
    }
  },

  // Delete a student resource by ID
  async deleteResource(resourceId) {
    try {
      const response = await axios.delete(`${baseURL}/${resourceId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete resource');
    }
  },

  // Edit an existing student resource by ID
  async editResource(resourceId, updatedData) {
    try {
      const response = await axios.put(`${baseURL}/${resourceId}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update resource');
    }
  },

  // Fetch a specific student resource by ID
  async getResourceByID(resourceId) {
    try {
      const response = await axios.get(`${baseURL}/${resourceId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch resource by ID');
    }
  }
};

export default resourceService;
