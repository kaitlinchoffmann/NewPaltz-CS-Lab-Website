import axios from 'axios';
/*
import { approve } from '../../../server/src/models/studentHighlightModel';
import {
  approveRequest,
  denyRequest,
} from '../../../server/src/models/studentModel';
*/

// NEED TO SWAP TO STUDENT API
const baseURL = '/api/student';

export const studentService = {
  // Fetch all students from the server
  async getAllStudents() {
    try {
      const response = await axios.get(`${baseURL}/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load Users');
    }
  },
  // Delete a student by their ID
  async deleteStudent(studentId) {
    try {
      const response = await axios.delete(
        `${baseURL}/student-panel/${studentId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete User');
    }
  },
  // Add a new student with the provided data
  async addStudent(studentData) {
    try {
      const response = await axios.post(`${baseURL}`, studentData);
      return response.data.id; // Ensure the response data is returned
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add User');
    }
  },

  //approve a student account request
  async approveRequest(requestData) {
    try {
      const response = await axios.post(`${baseURL}/approve`, requestData);
      return response.data.affectedRows; // Return number of affected rows
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to approve request'
      );
    }
  },
  //deny a student account request

  async denyRequest(requestId) {
    try {
      const response = await axios.delete(`${baseURL}/deny/${requestId}`);
      return response.data.affectedRows; // Return number of affected rows
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to deny request'
      );
    }
  },
};
