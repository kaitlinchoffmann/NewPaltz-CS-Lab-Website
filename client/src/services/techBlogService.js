import axios from 'axios';

const baseURL = '/api/tech-blog';

const techBlogService = {
  async getAllPosts() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching Tech Blog Posts:', error);
      throw new Error('Failed to load Blog Posts');
    }
  }
};

export default techBlogService;