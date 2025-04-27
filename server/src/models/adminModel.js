const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Get all admins (for debugging, no password included)
async function getAllAdmins() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT id, user, email, role FROM Admins");
    conn.release();
    return rows;
}

async function editAdminById(id, user, email, role) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            "UPDATE Admins SET user = ?, email = ?, role = ? WHERE id = ?",
            [user, email, role, id]
        );
        conn.release();
        return result.affectedRows > 0; // Return true if the update was successful
    } catch (error) {
        console.error("Error updating admin:", error); // Log the error for debugging
        throw new Error("Failed to update admin");
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
}
async function getAdminById(id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT user, email, role FROM Admins WHERE id = ?", [id]);
        return rows[0]; // Return the first result or undefined if not found
    } catch (error) {
        console.error("Error fetching admin by ID:", error); // Log the error for debugging
        throw new Error("Failed to fetch admin by ID");
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
}


// Add a new admin and hash the password before saving
async function addAdmin(user, email, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO Admins (user, email, password_hash) VALUES (?, ?, ?)",
        [user, email, hashedPassword]
    );
    conn.release();
    console.log("New admin added with ID:", result.insertId); // Log the new admin ID for debugging
    return result.insertId;
}
// Delete an admin by ID
async function deleteAdmin(id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Admins WHERE id = ?", [id]);
        console.log("Delete result:", result.affectedRows); // Log the result for debugging
        return result.affectedRows > 0; // Return true if the deletion was successful
    } catch (error) {
        console.error("Error deleting admin:", error); // Log the error for debugging
        throw new Error("Failed to delete admin");
    } finally {
        if (conn) conn.release(); // Ensure the connection is released
    }
}

// Check if a username is available
async function isUserAvailable(user) {
    let conn;
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT COUNT(*) as count FROM Admins WHERE user = ?", [user]);
        const result = Number(rows[0].count) === 0; // Convert BigInt to number before comparison
        console.log("Username availability check result:", result); // Log the result for debugging
        conn.release(); // Ensure the connection is released
        return result; // Return true if the username is available

}

// Check if an email is available
async function isEmailAvailable(email) {
    let conn;
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT COUNT(*) as count FROM Admins WHERE email = ?", [email]);
        console.log("Rows returned from email availability check:", rows); // Log the rows for debugging
        const result = Number(rows[0].count) === 0; // Convert BigInt to number before comparison
        console.log("Email availability check result:", result); // Log the result for debugging
        conn.release(); // Ensure the connection is released
        return result;

}
module.exports = { getAllAdmins, getAdminById, editAdminById, addAdmin, deleteAdmin, isUserAvailable, isEmailAvailable };
