import axios from 'axios';

const baseURL = '/sd-forms';
console.log('baseURL: ' + baseURL);
const sdFormService = {
  // Fetch all Server and Databse forms
  async getAllForms() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load forms data');
    }
  },

  // Add a new Server and Database request form
  async addForm(formData) {
    try {
      const response = await axios.post(baseURL, formData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add form');
    }
  },

  // Delete a Server and Database request form by ID
  async deleteForm(formId) {
    try {
      const response = await axios.delete(`${baseURL}/${formId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete form');
    }
  },
};

export default sdFormService;
