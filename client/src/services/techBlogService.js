import axios from 'axios';

const baseURL = '/api/tech-blog';

const techBlogService = {
  async getAllArticles() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching Tech Blog Posts:', error);
      throw new Error('Failed to load Blog Posts');
    }
  },

  async createArticle(postData) {
    try {
        const response = await axios.post(baseURL, postData);
        return response.data;
    } catch (error) {
        console.error("Error creating Technology Post:", error);
        throw new Error("Failed to create Blog Post");
    }
  },

  async getPendingArticles() {
    try {
      const response = await axios.get(`${baseURL}/pending`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Tech Blog Posts:', error);
      throw new Error('Failed to load Blog Posts');
    }
  }
,
  async deleteArticle(postId) {
    try {
      const response = await axios.delete(`${baseURL}/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting Tech Blog Post:', error);
      throw new Error('Failed to delete Blog Post');
    }
  },

  async approveArticle(postID) {
    try {
      const response = await axios.put(`${baseURL}/approve/${postID}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to Approve Blog Post', error);
    }
  },
  
  async getArticleById(postId) {
    try {
      const response = await axios.get(`${baseURL}/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Tech Blog Post:', error);
      throw new Error('Failed to load Blog Post');
    }
  },

  async editArticle(postId, postData) {
    try {
      const response = await axios.put(`${baseURL}/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error('Error updating Tech Blog Post:', error);
      throw new Error('Failed to update Blog Post');
    }
  }

};

export default techBlogService;