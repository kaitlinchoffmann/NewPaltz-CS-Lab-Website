const pool = require('../config/db');
/*
The table going to be used is as follows:
CREATE TABLE IF NOT EXISTS ServerDatabaseForm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    student_id VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

/**
 * Retrieves all Server/Database forms from the database
 * @returns {Promise<Array>} Array of form objects
 */
async function getAllSDForms() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM SDForms");
    conn.release();
    return rows;
};

/**
 * Adds a new Server/Database form to the database
 * @param {Object} formData - Form data containing full_name, email, and student_id
 * @returns {Promise<number>} The ID of the newly created form
 * 
 */

async function addSDForm(formData) {
    const { full_name, email, student_id } = formData;
    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO SDForms (full_name, email, student_id) VALUES (?, ?, ?)",
        [full_name, email, student_id]
    );
    conn.release();
    return result.insertId;
};

/**
 * Deletes a Server/Database form from the database by ID
 * @param {number} id - Form ID
 * @returns {Promise<number>} Number of affected rows
 */

async function deleteForm(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "DELETE FROM SDForms WHERE id = ?",
        [id]
    );
    conn.release();
    return result.affectedRows;
}

module.exports = {
    getAllSDForms,
    addSDForm,
    deleteForm
};
    


