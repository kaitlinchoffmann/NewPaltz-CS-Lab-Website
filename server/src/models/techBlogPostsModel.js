const pool = require('../config/db');

/**
 * Retrieves all blog posts from the database
 * @returns {Promise<Array>} Array of posts objects
 */
async function getAllPosts() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM TechBlog");
    conn.release();
    return rows;
}

/**
 * Adds a new post to the database
 * @param {string} title - Post title
 * @param {string} summary - Post content summmary
 * @param {string} author - Post author
 * @returns {Promise<number>} The ID of the newly created post
 */

async function addPost(title, summary, link, author) {
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

module.exports = { getAllPosts, addPost, removePost, updateTitle, updateSummary, updateLink, updateAuthor };

