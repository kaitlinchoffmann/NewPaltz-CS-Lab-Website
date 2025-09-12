/*CREATE TABLE Requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    f_name VARCHAR(255) NOT NULL,
    l_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);*/
const pool = require('../config/database');

/**
 * Retrieves all blog posts from the database
 * @returns {Promise<Array>} Array of posts objects
 */

// async function createRequest() {
//     const conn = await pool.getConnection();
//     const rows = await conn.query("SELECT * FROM Requests");
//     conn.release();
//     return rows;
// }


async function getPendingRequest(requestData) {
    const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      "SELECT * FROM AccountRequests WHERE status = 'pending' ORDER BY created_at DESC"
    );
    return rows;
  } finally {
    conn.release();
  }
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
/**
 * Delete an account request completely
 * @param {number} id
 * @returns {Promise<number>}
 */
// async function deleteRequest(id) {
//   const conn = await pool.getConnection();
//   try {
//     const result = await conn.query(
//       "DELETE FROM AccountRequests WHERE id = ?",
//       [id]
//     );
//     return result.affectedRows;
//   } finally {
//     conn.release();
//   }
// }

module.exports = {
  getPendingRequests,
  approveRequest,
  denyRequest,
  deleteRequest,
};

