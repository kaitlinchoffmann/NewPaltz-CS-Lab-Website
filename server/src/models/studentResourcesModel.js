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
async function addStudentResource(postData) {
    const { name, description, link } = postData;
    
    const conn = await pool.getConnection();
    try {
        const result = await conn.query(
            "INSERT INTO StudentResources (name, description, link) VALUES (?, ?, ?)",
            [name, description, link]
        );
        return result.insertId; // Return the ID of the newly created post
    } catch (err) {
        console.error("Database Error:", err);
        throw err;
    } finally {
        conn.release();
    }
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
 * Updates an existing student resource in the database
 * @param {Object} body - The request body containing updated resource data
 * @param {number} body.id - The ID of the resource to update
 * @param {string} body.name - New resource name
 * @param {string} body.description - New resource description
 * @param {string} body.link - New resource URL or location
 * @returns {Promise<number>} Number of affected rows
 */
async function editStudentResource(id, updatedData) {
    const conn = await pool.getConnection();
    try {
        const query = `
            UPDATE StudentResources
            SET name = ?, description = ?, link = ?
            WHERE id = ?
        `;
        const values = [
            updatedData.name,
            updatedData.description,
            updatedData.link,
            id,
        ];
        const result = await conn.query(query, values);
        return result.affectedRows;
    } catch (err) {
        console.error("Error in editStudentResource:", err);
        throw err;
    } finally {
        conn.release();
    }
}

/**
 * Retrieves a specific student resource by its ID
 * @param {number} id - The ID of the resource to retrieve
 * @returns {Promise<Object|null>} The resource object if found, or null if not found
 */
async function getResourceByID(id) {
    const conn = await pool.getConnection();
    try {
        const result = await conn.query(
            "SELECT * FROM StudentResources WHERE id = ?",
            [id]
        );
        conn.release();
        return result[0] || null; // Return the first row or null if not found
    } catch (err) {
        console.error("Error in getResourceByID:", err);
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = {
    getAllStudentResources,
    addStudentResource,
    removeStudentResource,
    editStudentResource,
    getResourceByID
};

