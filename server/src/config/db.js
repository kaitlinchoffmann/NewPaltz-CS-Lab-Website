/**
 * Database configuration and connection module
 * Establishes and manages MariaDB connection pool
 */

require('dotenv').config();

const mariadb = require('mariadb');

/**
 * MariaDB connection pool configuration
 * Uses environment variables for secure configuration
 * @constant {Object} pool
 */
const pool = mariadb.createPool({
    host: process.env.DB_HOST,         // Database host address
    user: process.env.DB_USER,         // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME,     // Target database name
    port: process.env.DB_PORT,         // Database port
    allowPublicKeyRetrieval: true, //TODO: IS THIS SAFE?
    connectionLimit: 5                  // Maximum number of connections in the pool
});

/**
 * Tests the database connection
 * Attempts to connect and execute a simple query
 * @async
 * @function testConnection
 * @returns {Promise<void>}
 */
// Connect and run a test query
console.log('Connecting with user:', process.env.DB_USER);
console.log('Password:', process.env.DB_PASSWORD ? '✓' : '❌ (missing)');

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 'Connected to MariaDB!' AS message");
        console.log(rows[0].message);
    } catch (err) {
        console.error("Error connecting to MariaDB:", err);
    } finally {
        if (conn) conn.release(); // Always release the connection back to the pool
    }
}

// Test connection on module load
if (process.env.NODE_ENV !== 'test') {
    testConnection();
}

// Export the connection pool for use in other modules
module.exports = pool;
