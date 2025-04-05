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

  async getPendingPosts() {
    try {
      const response = await axios.get(`${baseURL}/pending`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Student Highlights Posts:', error);
      throw new Error('Failed to load Blog Posts');
    }
  },

  async deletePost(postId) {
    try {
      const response = await axios.delete(`${baseURL}/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Student Highlights Post:', error);
      throw new Error('Failed to delete Blog Post');
    }
  },

  async approvePost(postID) {
    try {
      const response = await axios.put(`${baseURL}/approve/${postID}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to Approve Blog Post', error);
    }
  },

  async getPostById(postId) {
    try {
      const response = await axios.get(`${baseURL}/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Student Highlights Post:', error);
      throw new Error('Failed to load Blog Post');
    }
  },

  async editPost(id, updatedData) {
    try {
        const response = await axios.put(`${baseURL}/${id}`, updatedData); // Send all form data
        return response.data;
    } catch (error) {
        console.error("Error editing post:", error);
        throw new Error("Failed to edit post");
    }
},
};

export default studentHighlightService;