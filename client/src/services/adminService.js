import axios from 'axios';

const baseURL = '/api/admins';

export const adminService = {
    async getAllAdmins() {
        try {
            const response = await axios.get(`${baseURL}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Users:', error);
            throw new Error('Failed to load Users');
        }
    },
    async deleteAdmin(adminId) {
        try {
            const response = await axios.delete(`${baseURL}/admin-panel/${adminId}`);
            console.log("Backend Response:", response.data); // Log the response for debugging
            return response.data;
        } catch (error) {
            console.error("Error deleting User:", error);
            throw new Error("Failed to delete User");
        }
    },
    async addAdmin(adminData) {
        try {
            const response = await axios.post(`${baseURL}`, adminData);
            console.log("Backend Response:", response.data); // Log the response for debugging
            return response.data.id; // Ensure the response data is returned
        } catch (error) {
            console.error("Error adding User:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to add User");
        }
    },
    async getAdminByID(adminId) {
        try {
            const response = await axios.get(`${baseURL}/admin-panel/${adminId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching User by ID:', error);
            throw new Error('Failed to fetch User by ID');
        }
    },
    async editAdmin(adminId, adminData) {
        try {
            const response = await axios.put(`${baseURL}/admin-panel/${adminId}`, adminData);
            return response.data;
        } catch (error) {
            console.error('Error editing User:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to edit User');
        }
    },

    async checkUsernameAvailability(username) {
            console.log('Checking username availability for:', username); // Log the username being checked
            const response = await axios.get(`${baseURL}/check-username/${username}`);
            return response.data.available;

    },

    async checkEmailAvailability(email) {
            console.log('Checking email availability for:', email); // Log the email being checked
            const response = await axios.get(`${baseURL}/check-email/${email}`);
            console.log('Email availability response:', response); // Log the response for debugging
            return response.data.available;
    }
};