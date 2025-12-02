const pool = require('../config/db');

/**
 * Retrieves all courses from the database
 * @returns {Promise<Array>} Array of course objects
 */
async function getAllCourses() {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(`
            SELECT c.*,
                   GROUP_CONCAT(DISTINCT CONCAT(cr.name, '||', cr.url, '||', cr.description) SEPARATOR ';;') as resources
            FROM Courses c
            LEFT JOIN CourseResources cr ON c.id = cr.course_id
            GROUP BY c.id
            ORDER BY c.code ASC
        `);

        // Parse resources from concatenated string
        return rows.map(row => ({
            ...row,
            resources: row.resources ? row.resources.split(';;').map(r => {
                const [name, url, description] = r.split('||');
                return { name, url, description };
            }) : []
        }));
    } finally {
        conn.release();
    }
}

/**
 * Retrieves a specific course by its ID
 * @param {number} id - The ID of the course to retrieve
 * @returns {Promise<Object|null>} The course object if found
 */
async function getCourseByID(id) {
    const conn = await pool.getConnection();
    try {
        const courses = await conn.query(
            "SELECT * FROM Courses WHERE id = ?",
            [id]
        );

        if (!courses[0]) return null;

        const resources = await conn.query(
            "SELECT name, url, description FROM CourseResources WHERE course_id = ?",
            [id]
        );

        return {
            ...courses[0],
            resources: resources || []
        };
    } finally {
        conn.release();
    }
}

/**
 * Retrieves a specific course by its slug
 * @param {string} slug - The slug of the course
 * @returns {Promise<Object|null>} The course object if found
 */
async function getCourseBySlug(slug) {
    const conn = await pool.getConnection();
    try {
        const courses = await conn.query(
            "SELECT * FROM Courses WHERE slug = ?",
            [slug]
        );

        if (!courses[0]) return null;

        const resources = await conn.query(
            "SELECT name, url, description FROM CourseResources WHERE course_id = ?",
            [courses[0].id]
        );

        return {
            ...courses[0],
            resources: resources || []
        };
    } finally {
        conn.release();
    }
}

/**
 * Adds a new course to the database
 * @param {Object} courseData - The course data
 * @returns {Promise<number>} The ID of the newly created course
 */
async function addCourse(courseData) {
    const {
        code, name, section, professor, semester, description,
        syllabusFile, category, color, crn, credits, days, time, location, resources
    } = courseData;

    // Generate slug from code and section
    const slug = `${code.toLowerCase().replace(/\s+/g, '')}-${section || '01'}`.replace(/[^a-z0-9-]/g, '');

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const result = await conn.query(
            `INSERT INTO Courses (code, name, section, professor, semester, description,
             syllabusFile, category, color, crn, credits, days, time, location, slug)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [code, name, section, professor, semester, description,
             syllabusFile, category, color, crn, credits, days, time, location, slug]
        );

        const courseId = result.insertId;

        // Add resources if provided
        if (resources && resources.length > 0) {
            for (const resource of resources) {
                await conn.query(
                    "INSERT INTO CourseResources (course_id, name, url, description) VALUES (?, ?, ?, ?)",
                    [courseId, resource.name, resource.url, resource.description]
                );
            }
        }

        await conn.commit();
        return courseId;
    } catch (err) {
        await conn.rollback();
        console.error("Database Error:", err);
        throw err;
    } finally {
        conn.release();
    }
}

/**
 * Updates an existing course
 * @param {number} id - The course ID
 * @param {Object} courseData - The updated course data
 * @returns {Promise<number>} Number of affected rows
 */
async function editCourse(id, courseData) {
    const {
        code, name, section, professor, semester, description,
        syllabusFile, category, color, crn, credits, days, time, location, resources
    } = courseData;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // Update slug if code or section changed
        const slug = `${code.toLowerCase().replace(/\s+/g, '')}-${section || '01'}`.replace(/[^a-z0-9-]/g, '');

        const result = await conn.query(
            `UPDATE Courses SET
             code = ?, name = ?, section = ?, professor = ?, semester = ?,
             description = ?, syllabusFile = ?, category = ?, color = ?,
             crn = ?, credits = ?, days = ?, time = ?, location = ?, slug = ?
             WHERE id = ?`,
            [code, name, section, professor, semester, description,
             syllabusFile, category, color, crn, credits, days, time, location, slug, id]
        );

        // Update resources - delete old ones and insert new
        await conn.query("DELETE FROM CourseResources WHERE course_id = ?", [id]);

        if (resources && resources.length > 0) {
            for (const resource of resources) {
                await conn.query(
                    "INSERT INTO CourseResources (course_id, name, url, description) VALUES (?, ?, ?, ?)",
                    [id, resource.name, resource.url, resource.description]
                );
            }
        }

        await conn.commit();
        return result.affectedRows;
    } catch (err) {
        await conn.rollback();
        console.error("Error in editCourse:", err);
        throw err;
    } finally {
        conn.release();
    }
}

/**
 * Removes a course from the database
 * @param {number} id - The ID of the course to remove
 * @returns {Promise<number>} Number of affected rows
 */
async function removeCourse(id) {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // Delete resources first (foreign key constraint)
        await conn.query("DELETE FROM CourseResources WHERE course_id = ?", [id]);

        // Delete course
        const result = await conn.query("DELETE FROM Courses WHERE id = ?", [id]);

        await conn.commit();
        return result.affectedRows;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

/**
 * Get courses by category
 * @param {string} category - The category to filter by
 * @returns {Promise<Array>} Array of course objects
 */
async function getCoursesByCategory(category) {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query(
            `SELECT c.*,
                    GROUP_CONCAT(DISTINCT CONCAT(cr.name, '||', cr.url, '||', cr.description) SEPARATOR ';;') as resources
             FROM Courses c
             LEFT JOIN CourseResources cr ON c.id = cr.course_id
             WHERE c.category = ?
             GROUP BY c.id
             ORDER BY c.code ASC`,
            [category]
        );

        return rows.map(row => ({
            ...row,
            resources: row.resources ? row.resources.split(';;').map(r => {
                const [name, url, description] = r.split('||');
                return { name, url, description };
            }) : []
        }));
    } finally {
        conn.release();
    }
}

module.exports = {
    getAllCourses,
    getCourseByID,
    getCourseBySlug,
    addCourse,
    editCourse,
    removeCourse,
    getCoursesByCategory
};
