/**
 * Authentication Routes Module
 * Handles admin user registration and login functionality
 * @module authRoutes
 */

// Import required dependencies
const express = require("express");
const bcrypt = require("bcryptjs");  // For password hashing
const jwt = require("jsonwebtoken");  // For creating tokens
const pool = require("../config/db");  // Database connection
require("dotenv").config();  // Load environment variables

const router = express.Router();

/**
 * Register a new admin user
 * @route POST /register
 * @param {string} req.body.username - The admin's username
 * @param {string} req.body.password - The admin's password
 * @returns {object} 201 - Admin registered successfully
 * @returns {object} 400 - Username already exists or missing fields
 * @returns {object} 500 - Server error
 */

/**
 * Authenticate an admin user
 * @route POST /login
 * @param {string} req.body.username - Admin's user name
 * @param {string} req.body.password - Admin's password
 * @returns {object} 200 - Login successful with JWT token
 * @returns {object} 400 - Missing username or password
 * @returns {object} 401 - Invalid credentials or user not found
 * @returns {object} 500 - Server error
 */
// Login route handler
router.post("/login", async (req, res) => {
    let conn;  // Database connection variable
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Validate that both fields are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Get database connection
        conn = await pool.getConnection();

        // Query database for user
        const results = await conn.query(
            "SELECT * FROM Admins WHERE user = ?", 
            [username]
        );

        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const userFound = results[0];  // Get first (and should be only) result

        // Verify password hash exists in database
        if (!userFound.password_hash) {
            return res.status(500).json({ message: "Password hash not found" });
        }

        // Compare provided password with stored hash
        const passwordMatch = await bcrypt.compare(password, userFound.password_hash);

        // If password doesn't match
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { 
                id: userFound.id, 
                username: userFound.username 
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send successful response with token
        res.json({ token, message: "Login successful" });

    } catch (err) {
        // Handle any errors
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        // Always release the database connection
        if (conn) conn.release();
    }
});

module.exports = router;
