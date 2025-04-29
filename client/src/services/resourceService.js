import axios from 'axios';

const baseURL = '/api/student-resources';

const resourceService = {
  async getAllResources() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Failed to load question data');
    }
  },

  async addResource(resourceData) {
    try {
      const response = await axios.post(baseURL, resourceData);
      console.log('Resource added:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding resource:', error);
      throw new Error('Failed to add resource');
    }
    },

    async deleteResource(resourceId) {
      try {
        const response = await axios.delete(`${baseURL}/${resourceId}`);
        console.log('Resource deleted:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error deleting resource:', error);
        throw new Error('Failed to delete resource');
      }
    },

  async editResource(resourceId, updatedData) {
    try {
      const response = await axios.put(`${baseURL}/${resourceId}`, updatedData);
      console.log('Resource updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating resource:', error);
      throw new Error('Failed to update resource');
    }
  },

  async getResourceByID(resourceId) {
    try {
      const response = await axios.get(`${baseURL}/${resourceId}`);
      console.log('Resource fetched by ID:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource by ID:', error);
      throw new Error('Failed to fetch resource by ID');
    }
  }
};

export default resourceService;
