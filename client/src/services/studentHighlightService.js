import axios from 'axios';

const baseURL = '/api/student-highlights';

const studentHighlightService = {
  async getAllPosts() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching Student Highlights Posts:', error);
      throw new Error('Failed to load Blog Posts');
    }
  },

  async createPost(postData) {
    try {
        const response = await axios.post(baseURL, postData);
        return response.data;
    } catch (error) {
        console.error("Error creating Student Highlights Post:", error);
        throw new Error("Failed to create Blog Post");
    }
  },
};

export default studentHighlightService;