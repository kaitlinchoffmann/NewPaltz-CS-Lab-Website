const pool = require('../config/db');

/**
 * Get comp exam settings
 * @returns {Promise<Object>} Comp exam settings
 */
async function getCompExamSettings() {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query("SELECT * FROM CompExamSettings WHERE id = 1");
        if (rows.length === 0) {
            // Return defaults if no settings exist
            return {
                id: 1,
                exam_date: 'May 8th, 2025',
                exam_time: '9 AM - 12 PM',
                location: 'Science Hall 259'
            };
        }
        return rows[0];
    } finally {
        conn.release();
    }
}

/**
 * Update comp exam settings
 * @param {Object} data - Settings data
 * @param {string} data.exam_date - Exam date
 * @param {string} data.exam_time - Exam time
 * @param {string} data.location - Exam location
 * @returns {Promise<number>} Affected rows
 */
async function updateCompExamSettings(data) {
    const conn = await pool.getConnection();
    try {
        // Try to update first
        const result = await conn.query(
            `INSERT INTO CompExamSettings (id, exam_date, exam_time, location)
             VALUES (1, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
             exam_date = VALUES(exam_date),
             exam_time = VALUES(exam_time),
             location = VALUES(location)`,
            [data.exam_date, data.exam_time, data.location]
        );
        return result.affectedRows;
    } catch (err) {
        console.error("Error updating comp exam settings:", err);
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = { getCompExamSettings, updateCompExamSettings };
