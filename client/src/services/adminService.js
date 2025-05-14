import axios from 'axios';

const baseURL = '/api/admins';

export const adminService = {
    // Fetch all admins from the server
    async getAllAdmins() {
        try {
            const response = await axios.get(`${baseURL}/`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to load Users');
        }
    },
    // Delete an admin by their ID
    async deleteAdmin(adminId) {
        try {
            const response = await axios.delete(`${baseURL}/admin-panel/${adminId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to delete User");
        }
    },
    // Add a new admin with the provided data
    async addAdmin(adminData) {
        try {
            const response = await axios.post(`${baseURL}`, adminData);
            return response.data.id; // Ensure the response data is returned
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to add User");
        }
    },
    // Fetch a specific admin by their ID
    async getAdminByID(adminId) {
        try {
            const response = await axios.get(`${baseURL}/admin-panel/${adminId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch User by ID');
        }
    },
    // Edit an existing admin's details by their ID
    async editAdmin(adminId, adminData) {
        try {
            const response = await axios.put(`${baseURL}/admin-panel/${adminId}`, adminData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to edit User');
        }
    },
    // Check if a username is available
    async checkUsernameAvailability(username) {
        const response = await axios.get(`${baseURL}/check-username/${username}`);
        return response.data.available;
    },
    // Check if an email is available
    async checkEmailAvailability(email) {
        const response = await axios.get(`${baseURL}/check-email/${email}`);
        return response.data.available;
    }
};