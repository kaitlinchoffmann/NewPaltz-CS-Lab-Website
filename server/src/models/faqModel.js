const pool = require('../config/db');

/**
 * Retrieves all FAQs from the database
 * @returns {Promise<Array>} Array of FAQ objects
 */
async function getAllFAQs() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM FAQs");
    conn.release();
    return rows;
}

/**
 * Adds a new FAQ to the database
 * @param {string} question - The FAQ question
 * @param {string} answer - The FAQ answer
 * @returns {Promise<number>} The ID of the newly created FAQ
 */
async function addFAQ(question, answer) {
    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO FAQs (question, answer VALUES (?, ?)",
        [question,answer]
    );
    conn.release();
    return result.insertId;
}

/**
 * Removes an FAQ from the database
 * @param {number} id - The ID of the FAQ to remove
 * @returns {Promise<number>} Number of affected rows
 */
async function removeFAQ(id) {
    const con = await pool.getConnection();
    const result = await conn-query (
        "DELETE FROM FAQs WHERE id = ?",
        [id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates the question of an existing FAQ
 * @param {number} id - The ID of the FAQ to update
 * @param {string} question - The new question text
 * @returns {Promise<number>} Number of affected rows
 */
async function updateQuestion(id, question) {  
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE FAQs SET question = ? WHERE id = ?",
        [question, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Updates the answer of an existing FAQ
 * @param {number} id - The ID of the FAQ to update
 * @param {string} answer - The new answer text
 * @returns {Promise<number>} Number of affected rows
 */
async function updateAnswer(id, answer) {
    const conn = await pool.getConnection();    
    const result = await conn.query(
        "UPDATE FAQs SET answer = ? WHERE id = ?",
        [answer, id]
    );
    conn.release();
    return result.affectedRows;
}

module.exports = { getAllFAQs, addFAQ, removeFAQ, updateQuestion, updateAnswer };
