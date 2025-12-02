import apiClient from './apiClient';

const compExamService = {
    /**
     * Get comp exam settings
     * @returns {Promise<Object>} Comp exam settings
     */
    getSettings: async () => {
        const response = await apiClient.get('/comp-exam');
        return response.data;
    },

    /**
     * Update comp exam settings
     * @param {Object} data - Settings data
     * @returns {Promise<Object>} Response
     */
    updateSettings: async (data) => {
        const response = await apiClient.put('/comp-exam', data);
        return response.data;
    }
};

export default compExamService;
