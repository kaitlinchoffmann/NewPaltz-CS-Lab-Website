const express = require("express");
const router = express.Router();
const techPosts = require('../models/techBlogPostsModel');

router.get("/", async (req, res) => {
    try {
        const rows = await techPosts.getAllPosts();
        console.log('Sending techPosts data: ', rows);
        res.json(rows);
    } catch (err) {
        console.log('Error getting techPosts data:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await techPosts.addPost(
            req.body.name,
            req.body.email,
            req.body.website,
            req.body.office,
            req.body.office_hours,
            req.body.expertise
        );
        res.json({ id: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await techPosts.removePost(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/author", async (req, res) => {
    try {
        const result = await techPosts.updateAuthor(req.params.id, req.body.author);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/title", async (req, res) => {
    try {
        const result = await techPosts.updateTitle(req.params.id, req.body.title);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/summary", async (req, res) => {
    try {
        const result = await techPosts.updateSummary(req.params.id, req.body.summary);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 

router.put("/:id/link", async (req, res) => {
    try {
        const result = await techPosts.updateLink(req.params.id, req.body.link);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;

