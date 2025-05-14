import axios from 'axios';

const baseURL = '/api/student-highlights';

const studentHighlightService = {
  async getAllPosts() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      // Log and rethrow error for fetching all posts
      throw new Error('Failed to load Blog Posts');
    }
  },

  async createPost(postData) {
    try {
        const response = await axios.post(baseURL, postData);
        return response.data;
    } catch (error) {
        // Log and rethrow error for creating a post
        throw new Error("Failed to create Blog Post");
    }
  },

  async getPendingPosts() {
    try {
      const response = await axios.get(`${baseURL}/pending`);
      return response.data;
    } catch (error) {
      // Log and rethrow error for fetching pending posts
      throw new Error('Failed to load Blog Posts');
    }
  },

  async deletePost(postId) {
    try {
      const response = await axios.delete(`${baseURL}/${postId}`);
      return response.data;
    } catch (error) {
      // Log and rethrow error for deleting a post
      throw new Error('Failed to delete Blog Post');
    }
  },

  async approvePost(postID) {
    try {
      const response = await axios.put(`${baseURL}/approve/${postID}`);
      return response.data;
    } catch (error) {
      // Log and rethrow error for approving a post
      throw new Error('Failed to Approve Blog Post');
    }
  },

  async getPostById(postId) {
    try {
      const response = await axios.get(`${baseURL}/${postId}`);
      return response.data;
    } catch (error) {
      // Log and rethrow error for fetching a post by ID
      throw new Error('Failed to load Blog Post');
    }
  },

  async editPost(id, updatedData) {
    try {
        const response = await axios.put(`${baseURL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        // Log and rethrow error for editing a post
        throw new Error("Failed to edit post");
    }
  },
};

export default studentHighlightService;