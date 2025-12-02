import apiClient from './apiClient';

const courseService = {
    /**
     * Get all courses
     * @returns {Promise<Array>} Array of course objects
     */
    getAllCourses: async () => {
        const response = await apiClient.get('/courses');
        return response.data;
    },

    /**
     * Get course by ID
     * @param {number} id - Course ID
     * @returns {Promise<Object>} Course object
     */
    getCourseByID: async (id) => {
        const response = await apiClient.get(`/courses/${id}`);
        return response.data;
    },

    /**
     * Get course by slug
     * @param {string} slug - Course slug
     * @returns {Promise<Object>} Course object
     */
    getCourseBySlug: async (slug) => {
        const response = await apiClient.get(`/courses/slug/${slug}`);
        return response.data;
    },

    /**
     * Get courses by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Array of course objects
     */
    getCoursesByCategory: async (category) => {
        const response = await apiClient.get(`/courses/category/${category}`);
        return response.data;
    },

    /**
     * Add a new course
     * @param {FormData|Object} courseData - Course data (FormData for file upload)
     * @returns {Promise<Object>} Response with new course ID
     */
    addCourse: async (courseData) => {
        const config = courseData instanceof FormData
            ? { headers: { 'Content-Type': 'multipart/form-data' } }
            : {};
        const response = await apiClient.post('/courses', courseData, config);
        return response.data;
    },

    /**
     * Update a course
     * @param {number} id - Course ID
     * @param {FormData|Object} courseData - Updated course data
     * @returns {Promise<Object>} Response
     */
    editCourse: async (id, courseData) => {
        const config = courseData instanceof FormData
            ? { headers: { 'Content-Type': 'multipart/form-data' } }
            : {};
        const response = await apiClient.put(`/courses/${id}`, courseData, config);
        return response.data;
    },

    /**
     * Delete a course
     * @param {number} id - Course ID
     * @returns {Promise<Object>} Response
     */
    deleteCourse: async (id) => {
        const response = await apiClient.delete(`/courses/${id}`);
        return response.data;
    },

    /**
     * Upload syllabus file for a course
     * @param {number} id - Course ID
     * @param {File} file - Syllabus file
     * @returns {Promise<Object>} Response with file path
     */
    uploadSyllabus: async (id, file) => {
        const formData = new FormData();
        formData.append('syllabusFile', file);
        const response = await apiClient.post(`/courses/${id}/syllabus`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
};

export default courseService;
