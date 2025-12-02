import axios from 'axios';

const baseURL = '/api/sd-forms';
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
    console.log('formData: ' + formData);
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

  async getForm(formId) {
    try {
      const response = await axios.get(`${baseURL}/${formId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load form');
    }
  },

  async approveForm(formId) {
    try {
      const response = await axios.post(`${baseURL}/${formId}/approve`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to approve form');
    }
  },

  async createUser(email, nId) {
    try {
      const response = await axios.post('/api/scripts/admin/createUser', { email, nId });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },
};

export default sdFormService;
