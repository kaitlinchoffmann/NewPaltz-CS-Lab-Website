import axios from 'axios';

const baseURL = '/api/faculty';

const facultyService = {
  async getAllFaculty() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching faculty:', error);
      throw new Error('Failed to load faculty data');
    }
  }
};

export default facultyService;