const pool = require('../config/db');

/**
 * Retrieves all FAQs from the database
 * @returns {Promise<Array>} Array of FAQ objects
 */
async function getAllFAQs() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Faqs");
    conn.release();
    return rows;
}

/**
 * Adds a new FAQ to the database
 * @param {Object} data - The FAQ data object
 * @param {string} data.question - The FAQ question
 * @param {string} data.answer - The FAQ answer
 * @param {string} data.link - The FAQ link
 * @returns {Promise<number>} The ID of the newly created FAQ
 */
async function addFAQ(data) {
    const conn = await pool.getConnection();
    try {
        const query = `
            INSERT INTO Faqs (question, answer, link)
            VALUES (?, ?, ?)
        `;
        const values = [data.question, data.answer, data.link];
        const result = await conn.query(query, values);

        // Convert BigInt to a regular number if necessary
        const insertId = typeof result.insertId === 'bigint' ? Number(result.insertId) : result.insertId;

        return insertId; // Return the ID of the newly created FAQ
    } catch (err) {
        console.error("Error in addFAQ:", err);
        throw err;
    } finally {
        conn.release();
    }
}

/**
 * Removes an FAQ from the database
 * @param {number} id - The ID of the FAQ to remove
 * @returns {Promise<number>} Number of affected rows
 */
async function deleteFAQ(id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            "DELETE FROM Faqs WHERE id = ?",
            [id]
        );
        return result.affectedRows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) await conn.release();
    }
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
        "UPDATE Faqs SET question = ? WHERE id = ?",
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
        "UPDATE Faqs SET answer = ? WHERE id = ?",
        [answer, id]
    );
    conn.release();
    return result.affectedRows;
}

/**
 * Retrieves an FAQ by its ID
 * @param {number} id - The ID of the FAQ to retrieve
 * @returns {Promise<Object|null>} The FAQ object or null if not found
 */
async function getFaqByID(id) {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(
            "SELECT * FROM Faqs WHERE id = ?",
            [id]
        );
        if (rows.length === 0) {
            throw new Error(`FAQ with ID ${id} not found`);
        }
        return rows[0]; // Return the first row
    } catch (err) {
        console.error("Error in getFaqByID:", err);
        throw err;
    } finally {
        conn.release();
    }
}
    /**
     * Updates all fields of an existing FAQ
     * @param {number} id - The ID of the FAQ to update
     * @param {Object} data - The FAQ data object
     * @param {string} data.question - The new question text
     * @param {string} data.answer - The new answer text
     * @param {string} data.link - The new link
     * @returns {Promise<number>} Number of affected rows
     */
    async function updateFAQ(id, data) {
        const conn = await pool.getConnection();
        try {
            const query = `
                UPDATE Faqs
                SET question = ?, answer = ?, link = ?
                WHERE id = ?
            `;
            const values = [data.question, data.answer, data.link, id];
            const result = await conn.query(query, values);
            return result.affectedRows;
        } catch (err) {
            console.error("Error in updateFAQ:", err);
            throw err;
        } finally {
            conn.release();
        }
    }


module.exports = { getAllFAQs, addFAQ, deleteFAQ, getFaqByID, updateQuestion, updateAnswer, updateFAQ };
