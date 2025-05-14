import axios from 'axios';

const baseURL = '/api/faculty';

const facultyService = {
  // Fetch all faculty members
  async getAllFaculty() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load faculty data');
    }
  },

  // Delete a faculty member by ID
  async deleteFaculty(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete faculty');
    }
  },

  // Fetch a specific faculty member by ID
  async getFacultyByID(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch faculty data');
    }
  },

  // Add a new faculty member
  async addFaculty(facultyData) {
    try {
      const response = await axios.post(baseURL, facultyData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add faculty');
    }
  },

  // Edit an existing faculty member by ID
  async editFaculty(id, updatedData) {
    try {
      const response = await axios.put(`${baseURL}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to edit faculty');
    }
  }
};

export default facultyService;