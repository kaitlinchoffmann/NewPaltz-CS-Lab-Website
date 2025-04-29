const pool = require('../config/db');

/**
 * Retrieves all blog posts from the database
 * @returns {Promise<Array>} Array of posts objects
 */
async function getAllPosts() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM TechBlog WHERE approved = 1");
    conn.release();
    return rows;
}

async function getPendingPosts() {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query("SELECT * FROM TechBlog WHERE approved = 0");
        return rows;
    } catch(error)
    {
        console.error("Error executing query:", error);
        throw error; // Rethrow the error to be handled by the caller
    } finally {
        conn.release();
    }
}

/**
 * Adds a new post to the database
 * @param {string} title - Post title
 * @param {string} summary - Post content summary
 * @param {string} author - Post author
 * @returns {Promise<number>} The ID of the newly created post
 */

async function addPost(postData) {
    const { title, summary, link, author } = postData;
    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO TechBlog (title, summary, external_link, author_name) VALUES (?, ?, ?, ?)",
        [title, summary, link, author]
    );
    conn.release();
    return result.insertId;
}


async function removePost(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "DELETE FROM TechBlog WHERE id = ?",
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
async function updateTitle(id, name) {  
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
async function updateSummary(id, summary) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE TechBlog SET summary = ? WHERE id = ?",
        [summary, id]
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
        "UPDATE TechBlog SET external_link = ? WHERE id = ?",
        [link, id]
    );
    conn.release();
    return result.affectedRows;
}

async function updateAuthor(id, author) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "UPDATE TechBlog SET author_name = ? WHERE id = ?",
        [author, id]
    );
    conn.release();
    return result.affectedRows;
}

async function approvePost(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "UPDATE TechBlog SET approved = 1 WHERE id = ?",
        [id]
    );
    conn.release();
    return result.affectedRows;
}

async function getPostById(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "SELECT * FROM TechBlog WHERE id = ?",
        [id]
    );
    conn.release();
    return result;
}

async function editPost(id, updatedData) {
    const conn = await pool.getConnection();
    try {
        const query = `
            UPDATE TechBlog
            SET title = ?, author_name = ?, summary = ?, external_link = ?, image = ?
            WHERE id = ?
        `;
        const values = [
            updatedData.title,
            updatedData.author_name,
            updatedData.summary,
            updatedData.external_link,
            updatedData.image,
            id,
        ];
        const result = await conn.query(query, values); // Remove destructuring for debugging
        return result.affectedRows; // Adjust this based on the actual structure of `result`
    } catch (err) {
        console.error("Error in editPost:", err);
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = { getAllPosts, getPendingPosts, getPostById, addPost, approvePost, removePost, 
    updateTitle, updateSummary, updateLink, updateAuthor, editPost };

