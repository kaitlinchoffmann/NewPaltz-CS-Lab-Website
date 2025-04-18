const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Get all admins (for debugging, no password included)
async function getAllAdmins() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT id, user, email, role FROM Admins");
    conn.release();
    return rows;
}

// Get a specific admin by username
async function getAdminByUser(user) {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Admins WHERE user = ?", [user]);
    conn.release();
    return rows.length ? rows[0] : null;
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
    return result.insertId;
}

module.exports = { getAllAdmins, getAdminByUser, addAdmin };
