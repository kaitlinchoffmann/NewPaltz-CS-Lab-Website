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
    const rows = await conn.query("SELECT * FROM ServerDatabaseForm");
    conn.release();
    return rows;
};

/**
 * Adds a new Server/Database form to the database
 * @param {string} full_name - Form data containing full_name
 * @param {string} email - Form data containing email
 * @param {string} student_id - Form data containing student_id
 * @returns {Promise<number>} The ID of the newly created form
 * 
 */

async function addSDForm(postData) {
    const { full_name, email, student_id } = postData;
    try{
        const result = await confirm.query(
            "INSERT INTO ServerDatabaseForm (full_name, email, student_id) VALUES (?, ?, ?)",
            [full_name, email, student_id]
        );
        return result.insertId; // Return the ID of the newly created form
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error('Failed to add form');
    }
};

/**
 * Deletes a Server/Database form from the database by ID
 * @param {number} id - Form ID
 * @returns {Promise<number>} Number of affected rows
 */

async function deleteForm(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "DELETE FROM ServerDatabaseForm WHERE id = ?",
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
    


