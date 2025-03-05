const express = require("express");
const router = express.Router();
const highlightPosts = require('../models/studentHighlightModel');

// GET all student highlights
router.get("/", async (req, res) => {
    try {
        const rows = await highlightPosts.getAllPosts();
        console.log('Sending student highlights:', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error getting student highlights:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST new student highlight
router.post("/", async (req, res) => {
    try {
        const { title, summary, projectLink, githubLink, name } = req.body;
        const result = await highlightPosts.addPost(
            title,
            summary,
            projectLink,
            githubLink,
            name
        );
        res.status(201).json({ id: result });
    } catch (err) {
        console.error('Error adding student highlight:', err);
        res.status(500).json({ message: err.message });
    }
});

// DELETE student highlight
router.delete("/:id", async (req, res) => {
    try {
        const result = await highlightPosts.removePost(req.params.id);
        if (result === 0) {
            return res.status(404).json({ message: "Student highlight not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error deleting student highlight:', err);
        res.status(500).json({ message: err.message });
    }
});

// UPDATE project title
router.put("/:id/title", async (req, res) => {
    try {
        const result = await highlightPosts.updateTitle(req.params.id, req.body.title);
        if (result === 0) {
            return res.status(404).json({ message: "Student highlight not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error updating project title:', err);
        res.status(500).json({ message: err.message });
    }
});

// UPDATE project summary
router.put("/:id/summary", async (req, res) => {
    try {
        const result = await highlightPosts.updateSummary(req.params.id, req.body.summary);
        if (result === 0) {
            return res.status(404).json({ message: "Student highlight not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error updating summary:', err);
        res.status(500).json({ message: err.message });
    }
});

// UPDATE project description
router.put("/:id/description", async (req, res) => {
    try {
        const result = await highlightPosts.updateDescription(req.params.id, req.body.description);
        if (result === 0) {
            return res.status(404).json({ message: "Student highlight not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error updating description:', err);
        res.status(500).json({ message: err.message });
    }
});

// UPDATE project link
router.put("/:id/project-link", async (req, res) => {
    try {
        const result = await highlightPosts.updateProjectLink(req.params.id, req.body.projectLink);
        if (result === 0) {
            return res.status(404).json({ message: "Student highlight not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error updating project link:', err);
        res.status(500).json({ message: err.message });
    }
});

// UPDATE github link
router.put("/:id/github-link", async (req, res) => {
    try {
        const result = await highlightPosts.updateGithubLink(req.params.id, req.body.githubLink);
        if (result === 0) {
            return res.status(404).json({ message: "Student highlight not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error updating github link:', err);
        res.status(500).json({ message: err.message });
    }
});

// UPDATE headshot URL
router.put("/:id/headshot", async (req, res) => {
    try {
        const result = await highlightPosts.updateHeadshot(req.params.id, req.body.headshot);
        if (result === 0) {
            return res.status(404).json({ message: "Student highlight not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error updating headshot:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

