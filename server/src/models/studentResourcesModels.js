const pool = require('../config/db');

/**
 * Retrieves all student resources from the database
 * @returns {Promise<Array>} Array of student resource objects
 */
async function getAllStudentResources() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM StudentResources");
    conn.release();
    return rows;
}

/**
 * Adds a new student resource to the database
 * @param {string} name - Resource name
 * @param {string} description - Resource description
 * @param {string} link - Resource URL or location
 * @returns {Promise<number>} The ID of the newly created resource
 */
async function addStudentResource(name, description, link) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO StudentResources (name, description, link VALUES (?, ?, ?)",
        [name, description, link]
    );
    conn.release();
    return result.insertId;
}

/**
 * Removes a student resource from the database
 * @param {number} id - The ID of the resource to remove
 * @returns {Promise<number>} Number of affected rows
 */
async function removeStudentResource(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "DELETE FROM StudentResources WHERE id = ?",
        [id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a student resource's name
 * @param {number} id - Resource ID
 * @param {string} name - New resource name
 * @returns {Promise<number>} Number of affected rows
 */
async function updateName(id, name) {  
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentResources SET name = ? WHERE id = ?",
        [name, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a student resource's description
 * @param {number} id - Resource ID
 * @param {string} description - New resource description
 * @returns {Promise<number>} Number of affected rows
 */
async function updateDescription(id, description) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentResources SET description = ? WHERE id = ?",
        [description, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a student resource's link
 * @param {number} id - Resource ID
 * @param {string} link - New resource URL or location
 * @returns {Promise<number>} Number of affected rows
 */
async function updateLink(id, link) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentResources SET link = ? WHERE id = ?",
        [link, id]
    );
    conn.release();
    return result.affectedRows;
}

module.exports = { getAllStudentResources, addStudentResource, removeStudentResource, updateName, updateDescription, updateLink };

