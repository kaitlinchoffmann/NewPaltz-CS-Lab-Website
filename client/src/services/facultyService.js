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
  },

  async getFacultyByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching faculty with id ${id}:`, error);
      throw new Error('Failed to fetch faculty data');
    }
    },

    async addFaculty(facultyData) {
      try {
        const response = await axios.post(baseURL, facultyData);
        return response.data;
      } catch (error) {
        console.error('Error adding faculty:', error);
        throw new Error('Failed to add faculty');
      }
    },

    async editFaculty(id, updatedData) {
      try {
        const response = await axios.put(`${baseURL}/${id}`, updatedData);
        return response.data;
      } catch (error) {
        console.error(`Error editing faculty with id ${id}:`, error);
        throw new Error('Failed to edit faculty');
      }
    }
};

export default facultyService;