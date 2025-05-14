const pool = require('../config/db');

/**
 * Retrieves all faculty members from the database
 * @returns {Promise<Array>} Array of faculty objects
 */
async function getAllFaculty() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Faculty");
    conn.release(); // Release the connection back to the pool
    return rows;
}

/**
 * Adds a new faculty member to the database
 * @param {Object} faculty - Object containing faculty details
 * @returns {Promise<number>} ID of the newly added faculty member
 */
async function addFaculty(faculty) {
    const conn = await pool.getConnection();
    try {
        const result = await conn.query(
            "INSERT INTO Faculty (name, email, phone_number, office_location, office_hours, role, website, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [faculty.name, faculty.email, faculty.phone_number, faculty.office_location, faculty.office_hours, faculty.role, faculty.website, faculty.img]
        );
        return result.insertId;
    } catch (err) {
        console.error("Error in addFaculty:", err);
        throw err;
    } finally {
        conn.release(); // Ensure the connection is released in all cases
    }
}

/**
 * Removes a faculty member from the database
 * @param {number} id - The ID of the faculty member to remove
 * @returns {Promise<number>} Number of affected rows
 */
async function removeFaculty(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "DELETE FROM Faculty WHERE id = ?",
        [id]
    );
    conn.release(); // Release the connection back to the pool
    return result.affectedRows; // Return the number of rows affected
}

/**
 * Retrieves a specific faculty member by ID
 * @param {number} id - The ID of the faculty member to retrieve
 * @returns {Promise<Object>} Faculty member object
 */
async function getFaculty(id) {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Faculty WHERE id = ?", [id]);
    conn.release(); // Release the connection back to the pool
    return rows;
}

/**
 * Updates multiple fields of a faculty member
 * @param {number} id - Faculty member's ID
 * @param {Object} updates - Object containing the fields to update and their new values
 * @returns {Promise<number>} Number of affected rows
 */
async function editFaculty(id, data) {
    const conn = await pool.getConnection();
    try {
        const query = `
            UPDATE Faculty
            SET name = ?, role = ?, email = ?, office_hours = ?, office_location = ?, phone_number = ?, website = ?, img = ? 
            WHERE id = ?
        `;
        const values = [
            data.name, 
            data.role, 
            data.email, 
            data.office_hours, 
            data.office_location, 
            data.phone_number, 
            data.website, 
            data.img,
            id
        ];
        const result = await conn.query(query, values);
        return result.affectedRows;
    } catch (err) {
        console.error("Error in updateFAQ:", err);
        throw err;
    } finally {
        conn.release(); // Ensure the connection is released in all cases
    }
}

/**
 * Retrieves a faculty member by their ID
 * @param {number} id - The ID of the faculty member to retrieve
 * @returns {Promise<Object|null>} Faculty member object or null if not found
 */
async function getFacultyById(id) {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Faculty WHERE id = ?", [id]);
    conn.release(); // Release the connection back to the pool
    return rows.length > 0 ? rows[0] : null; // Return the faculty member or null if not found
}

module.exports = { getAllFaculty, addFaculty, removeFaculty, editFaculty, getFaculty, getFacultyById };
