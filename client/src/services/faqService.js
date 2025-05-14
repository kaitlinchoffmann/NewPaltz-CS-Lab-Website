import axios from 'axios';

const baseURL = '/api/faq';

const faqService = {
  // Fetch all FAQs
  async getAllFaq() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load FAQ data');
    }
  },

  // Delete an FAQ by ID
  async deleteFAQ(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete FAQ');
    }
  },

  // Add a new FAQ
  async addFAQ(faqData) {
    try {
      const response = await axios.post(baseURL, faqData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add FAQ");
    }
  },

  // Fetch a specific FAQ by ID
  async getFaqByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch FAQ by ID');
    }
  },

  // Edit an existing FAQ by ID
  async editFAQ(id, faqData) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, faqData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to edit FAQ');
    }
  }
}

export default faqService;
