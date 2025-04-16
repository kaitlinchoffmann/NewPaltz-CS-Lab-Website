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
  },

  async deleteFaculty(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting faculty with id ${id}:`, error);
      throw new Error('Failed to delete faculty');
    }
  }
};

export default facultyService;