const express = require("express");
const router = express.Router();
const courses = require('../models/coursesModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for syllabus file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads/syllabi');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and Word documents are allowed'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Get all courses
router.get("/", async (req, res) => {
    try {
        const rows = await courses.getAllCourses();
        res.json(rows);
    } catch (err) {
        console.error("Error getting courses:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get courses by category
router.get("/category/:category", async (req, res) => {
    try {
        const rows = await courses.getCoursesByCategory(req.params.category);
        res.json(rows);
    } catch (err) {
        console.error("Error getting courses by category:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get course by slug
router.get("/slug/:slug", async (req, res) => {
    try {
        const course = await courses.getCourseBySlug(req.params.slug);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (err) {
        console.error("Error getting course by slug:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get course by ID
router.get("/:id", async (req, res) => {
    try {
        const course = await courses.getCourseByID(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (err) {
        console.error("Error getting course by ID:", err);
        res.status(500).json({ message: err.message });
    }
});

// Add new course with optional syllabus upload
router.post("/", upload.single('syllabusFile'), async (req, res) => {
    try {
        const courseData = req.body;

        // Parse resources if sent as JSON string
        if (typeof courseData.resources === 'string') {
            courseData.resources = JSON.parse(courseData.resources);
        }

        // If file was uploaded, set the path
        if (req.file) {
            courseData.syllabusFile = `/uploads/syllabi/${req.file.filename}`;
        }

        const result = await courses.addCourse(courseData);
        res.status(201).json({ message: "Course added successfully", id: result });
    } catch (err) {
        console.error("Error adding course:", err);
        res.status(500).json({ message: err.message });
    }
});

// Update course
router.put("/:id", upload.single('syllabusFile'), async (req, res) => {
    try {
        const courseData = req.body;

        // Parse resources if sent as JSON string
        if (typeof courseData.resources === 'string') {
            courseData.resources = JSON.parse(courseData.resources);
        }

        // If file was uploaded, set the new path
        if (req.file) {
            courseData.syllabusFile = `/uploads/syllabi/${req.file.filename}`;
        }

        const result = await courses.editCourse(req.params.id, courseData);
        res.json({ message: "Course updated successfully", affectedRows: result });
    } catch (err) {
        console.error("Error updating course:", err);
        res.status(500).json({ message: err.message });
    }
});

// Delete course
router.delete("/:id", async (req, res) => {
    try {
        const result = await courses.removeCourse(req.params.id);
        res.json({ message: "Course deleted successfully", affectedRows: result });
    } catch (err) {
        console.error("Error deleting course:", err);
        res.status(500).json({ message: err.message });
    }
});

// Upload syllabus file separately
router.post("/:id/syllabus", upload.single('syllabusFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const syllabusPath = `/uploads/syllabi/${req.file.filename}`;

        // Get current course to update just the syllabus
        const course = await courses.getCourseByID(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        await courses.editCourse(req.params.id, {
            ...course,
            syllabusFile: syllabusPath
        });

        res.json({ message: "Syllabus uploaded successfully", path: syllabusPath });
    } catch (err) {
        console.error("Error uploading syllabus:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
