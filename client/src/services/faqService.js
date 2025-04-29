import axios from 'axios';

const baseURL = '/api/faq';

const faqService = {
  async getAllFaq() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Failed to load question data');
    }
  },

  async deleteFAQ(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw new Error('Failed to delete FAQ');
    }
  },

  async addFAQ(faqData) {
    try {
        const response = await axios.post(baseURL, faqData);
        console.log("Backend Response:", response.data); // Log the response for debugging
        return response.data; // Ensure the response data is returned
    } catch (error) {
        console.error("Error adding FAQ:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to add FAQ");
    }
  },

  async getFaqByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQ by ID:', error);
      throw new Error('Failed to fetch FAQ by ID');
    }
  },

  async editFAQ(id, faqData) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, faqData);
      return response.data;
    } catch (error) {
      console.error('Error editing FAQ:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to edit FAQ');
    }
  }
}

export default faqService;
