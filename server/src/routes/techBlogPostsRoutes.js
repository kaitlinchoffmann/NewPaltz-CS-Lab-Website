const express = require("express");
const router = express.Router();
const techPosts = require('../models/techBlogPostsModel');

router.get("/", async (req, res) => {
    try {
        console.log("Hi from tech blog");
        const rows = await techPosts.getAllPosts();
        console.log('Sending techPosts data: ', rows);
        res.json(rows);
    } catch (err) {
        console.log('Error getting techPosts data:', err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/pending", async (req, res) => {
    try {
        const rows = await techPosts.getPendingPosts();
        console.log('Sending techPosts data: ', rows);
        res.json(rows);
    } catch (err) {
        console.log('Error getting techPosts data:', err);
        res.status(500).json({ message: err.message });
    }
}
);

router.post("/", async (req, res) => {
    try {
        await techPosts.addPost(req.body);

        res.status(201).json({ message: "Tech Blog Post added successfully" });
    } catch (err) {
        console.error("Error adding tech blog post :", err);
        res.status(500).json({ message: "Internal Server Error" });
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

router.get("/:id", async (req, res) => {
    try {
        const result = await techPosts.getPostById(req.params.id);
        if (result.length === 0) {
            return res.status(404).json({ message: "Tech Blog Post not found" });
        }
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/approve/:id", async (req, res) => {
    try {
        const result = await techPosts.approvePost(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const result = await techPosts.editPost(req.params.id, req.body);
        if (result === 0) {
            return res.status(404).json({ message: "Tech Blog Post not found" });
        }
        res.json({ affectedRows: result });
    } catch (err) {
        console.error('Error updating Tech Blog Post:', err);
        res.status(500).json({ message: err.message });
    }
}
);


module.exports = router;

