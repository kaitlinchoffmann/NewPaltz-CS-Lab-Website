const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Get all admins (for debugging, no password included)
async function getAllStudents() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT id, user, email, role FROM Admins");
    conn.release();
    return rows;
}

async function editStudentById(id, user, email, role) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            "UPDATE Student SET user = ?, email = ?, role = ? WHERE id = ?",
            [user, email, role, id]
        );
        conn.release();
        return result.affectedRows > 0; // Return true if the update was successful
    } catch (error) {
        console.error("Error updating student:", error); // Log the error for debugging
        throw new Error("Failed to update student");
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
}
async function getStudentById(id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT user, email, role FROM Students WHERE id = ?", [id]);
        return rows[0]; // Return the first result or undefined if not found
    } catch (error) {
        console.error("Error fetching student by ID:", error); // Log the error for debugging
        throw new Error("Failed to fetch student by ID");
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
}


// Add a new student and hash the password before saving
async function addStudent(user, email, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO Student (user, email, password_hash) VALUES (?, ?, ?)",
        [user, email, hashedPassword]
    );
    conn.release();
    return result.insertId;
}
// Delete an student by ID
async function deleteStudent(id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Students WHERE id = ?", [id]);
        return result.affectedRows > 0; // Return true if the deletion was successful
    } catch (error) {
        console.error("Error deleting student:", error); // Log the error for debugging
        throw new Error("Failed to delete student");
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
}

// Check if a username is available
async function isUserAvailable(user) {
    let conn;
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT COUNT(*) as count FROM Students WHERE user = ?", [user]);
        const result = Number(rows[0].count) === 0; // Convert BigInt to number before comparison
        conn.release(); // Ensure the connection is released
        return result; // Return true if the username is available

}

// Check if an email is available
async function isEmailAvailable(email) {
    let conn;
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT COUNT(*) as count FROM Students WHERE email = ?", [email]);
        const result = Number(rows[0].count) === 0; // Convert BigInt to number before comparison
        conn.release(); // Ensure the connection is released
        return result;

}

/**
 * Approve an account request
 * @param {number} id - Request ID
 * @returns {Promise<number>} Number of affected rows
 */
async function approveRequest(requestData) {
 const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "UPDATE AccountRequests SET status = 'approved' WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } finally {
    conn.release();
  }
}

/**
 * Deny an account request
 * @param {number} id - Request ID
 * @returns {Promise<number>} Number of affected rows
 */
async function denyRequest(requestData) {
const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "UPDATE AccountRequests SET status = 'denied' WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } finally {
    conn.release();
  }
}
module.exports = { getAllStudents, getStudentById, editStudentById, addStudent, deleteStudent, isUserAvailable, isEmailAvailable };
