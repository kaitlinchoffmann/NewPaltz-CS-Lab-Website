const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Get all admins (for debugging, no password included)
async function getAllAdmins() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT id, name, email, role FROM Admins");
    conn.release();
    return rows;
}


async function getAdminByUser(user) {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM Admins WHERE user = ?", [user]);
    conn.release();
    return rows.length ? rows[0] : null;
}

// Add a new admin and hash the password before saving
async function addAdmin(name, email, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

    const conn = await pool.getConnection();
    const result = await conn.query(
        "INSERT INTO Admins (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
    );
    conn.release();
    return result.insertId;
}

async function adminExists(user) {
    let sql = `SELECT * FROM Admins WHERE user = ?`;
    let result = await pool.query(sql, [user]); // Correctly pass the parameter
    return result.length ? result[0] : null; // Return the admin record or null
}

//service handles the login process
async function login(admin) {
    let cAdmin = await adminExists(admin.user); // Fetch admin by user
    
    if (!cAdmin) throw new Error('User not found');

    // Compare hashed password in DB with plaintext password entered
    const isMatch = await bcrypt.compare(admin.password, cAdmin.password_hash);
    if (!isMatch) throw new Error('Incorrect password');

    return cAdmin; // Successful login
}

module.exports = { getAllAdmins, getAdminByUser, addAdmin };

