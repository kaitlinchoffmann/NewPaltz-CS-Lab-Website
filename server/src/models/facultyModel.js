const pool = require('../config/db');

/**
 * Retrieves all faculty members from the database
 * @returns {Promise<Array>} Array of faculty objects
 */
async function getAllFaculty() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Faculty");
    conn.release();
    return rows;
}

/**
 * Adds a new faculty member to the database
 * @param {string} name - Faculty member's name
 * @param {string} email - Faculty member's email
 * @param {string} website - Faculty member's website URL
 * @param {string} office - Faculty member's office location
 * @param {string} office_hours - Faculty member's office hours
 * @param {string} expertise - Faculty member's areas of expertise
 * @returns {Promise<number>} The ID of the newly created faculty record
 */
async function addFaculty(name, email, website, office, office_hours, expertise) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO Faculty (name, email, website, office, office_hours, expertise) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, website, office, office_hours, expertise]
    );
    conn.release();
    return result.insertId;
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
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a faculty member's email
 * @param {number} id - Faculty member's ID
 * @param {string} email - New email address
 * @returns {Promise<number>} Number of affected rows
 */
async function updateEmail(id, email) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE Faculty SET email = ? WHERE id = ?",
        [email, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a faculty member's office location
 * @param {number} id - Faculty member's ID
 * @param {string} office - New office location
 * @returns {Promise<number>} Number of affected rows
 */
async function updateOffice(id, office) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE Faculty SET office = ? WHERE id = ?",
        [office, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a faculty member's office hours
 * @param {number} id - Faculty member's ID
 * @param {string} office_hours - New office hours
 * @returns {Promise<number>} Number of affected rows
 */
async function updateOfficeHours(id, office_hours) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE Faculty SET office_hours = ? WHERE id = ?",
        [office_hours, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a faculty member's expertise areas
 * @param {number} id - Faculty member's ID
 * @param {string} expertise - New areas of expertise
 * @returns {Promise<number>} Number of affected rows
 */
async function updateExpertise(id, expertise) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE Faculty SET expertise = ? WHERE id = ?",
        [expertise, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a faculty member's name
 * @param {number} id - Faculty member's ID
 * @param {string} name - New name
 * @returns {Promise<number>} Number of affected rows
 */
async function updateName(id, name) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE Faculty SET name = ? WHERE id = ?",
        [name, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a faculty member's website URL
 * @param {number} id - Faculty member's ID
 * @param {string} website - New website URL
 * @returns {Promise<number>} Number of affected rows
 */
async function updateWebsite(id, website) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE Faculty SET website = ? WHERE id = ?",
        [website, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Retrieves a specific faculty member by ID
 * @param {number} id - The ID of the faculty member to retrieve
 * @returns {Promise<Object>} Faculty member object
 */
async function getFaculty(id) {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Faculty WHERE id = ?", [id]);
    conn.release();
    return rows;
}

module.exports = { getAllFaculty, addFaculty, removeFaculty, updateEmail, updateOffice, 
    updateOfficeHours, updateExpertise, updateName, updateWebsite, getFaculty };
