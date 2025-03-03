
import axios from 'axios';

const baseURL = 'http://localhost:5001/faq';

const faqService = {
  async getAllFaq() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Failed to load question data');
    }
  }
};

export default faqService;