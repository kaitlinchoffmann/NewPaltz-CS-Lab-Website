const pool = require('../config/db');

/**
 * Retrieves all blog posts from the database
 * @returns {Promise<Array>} Array of posts objects
 */
async function getAllPosts() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM StudentHighlightBlog WHERE approved = 1");
    conn.release();
    return rows;
}

async function getPendingPosts() {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query("SELECT * FROM StudentHighlightBlog WHERE approved = 0");

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
    const { project_title, summary, project_description, project_link, github_link, student_name, headshot_url } = postData;
    
    const conn = await pool.getConnection();
    try {
        const result = await conn.query(
            "INSERT INTO StudentHighlightBlog (project_title, summary, project_description, project_link, github_link, student_name, headshot_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [project_title, summary, project_description, project_link, github_link, student_name, headshot_url]
        );
        return result.insertId; // Return the ID of the newly created post
    } catch (err) {
        console.error("Database Error:", err);
        throw err;
    } finally {
        conn.release();
    }
}


async function deletePost(id) {
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

async function approve(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "UPDATE StudentHighlightBlog SET approved = 1 WHERE id = ?",
        [id]
    );
    conn.release();
    return result.affectedRows;
}

async function getPostById(id) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "SELECT * FROM StudentHighlightBlog WHERE id = ?",
        [id]
    );
    conn.release();
    return result;
}

async function editPost(id, updatedData) {
    const conn = await pool.getConnection();
    try {
        const query = `
            UPDATE StudentHighlightBlog
            SET project_title = ?, student_name = ?, project_description = ?, summary = ?, project_link = ?, github_link = ?, headshot_url = ?
            WHERE id = ?
        `;
        const values = [
            updatedData.project_title,
            updatedData.student_name,
            updatedData.project_description,
            updatedData.summary,
            updatedData.project_link,
            updatedData.github_link,
            updatedData.headshot_url,
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

module.exports = { getAllPosts, getPendingPosts, addPost, deletePost, updateTitle, updateSummary, updateDescription, 
    updateProjectLink, updateHeadshot, updateTechnologies, updateGithubLink, updateStudentName,
     approve, getPostById, editPost};

