const pool = require('../config/db');

/**
 * Retrieves all blog posts from the database
 * @returns {Promise<Array>} Array of posts objects
 */
async function getAllPosts() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM StudentHighlightBlog");
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

async function addPost(title, summary, projectLink, githubLink, name) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO TechBlog (project_title, summary, project_link, github_link, student_name) VALUES (?, ?, ?, ?, ?)",
        [title, summary, projectLink, githubLink, name]
    );
    conn.release();
    return result.insertId;
}


async function removePost(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "DELETE FROM StudentHighlightBlog WHERE id = ?",
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
async function updateTitle(id, title) {  
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET project_title = ? WHERE id = ?",
        [title, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates a student resource's description
 * @param {number} id - Resource ID
 * @param {string} summary - New resource description
 * @returns {Promise<number>} Number of affected rows
 */
async function updateSummary(id, summary) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET summary = ? WHERE id = ?",
        [summary, id]
    );
    conn.release();
    return result.affectedRows;
}


async function updateDescription(id, description) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET project_description = ? WHERE id = ?",
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

async function updateProjectLink(id, projectLink) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET project_link = ? WHERE id = ?",
        [projectLink, id]
    );
    conn.release();
    return result.affectedRows;
}

async function updateHeadshot(id, headshot) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET headshot_url = ? WHERE id = ?",
        [headshot, id]
    );
    conn.release();
    return result.affectedRows;
}

async function updateTechnologies (id, Technologies){
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET technologies_used = ? WHERE id = ?",
        [Technologies, id]
    );
    conn.release();
    return result.affectedRows;
}

async function updateGithubLink(id, githubLink) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET github_link = ? WHERE id = ?",
        [githubLink, id]
    );
    conn.release();
    return result.affectedRows;
}

async function updateStudentName(id, studentName) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET student_name = ? WHERE id = ?",
        [studentName, id]
    );
    conn.release();
    return result.affectedRows;
}

module.exports = { getAllPosts, addPost, removePost, updateTitle, updateSummary, updateDescription, updateProjectLink, updateHeadshot, updateTechnologies, updateGithubLink, updateStudentName };

