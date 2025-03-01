const express = require("express");
const router = express.Router();
const studentResources = require('../models/studentResourcesModel');

router.get("/", async (req, res) => {
    try {
        const rows = await studentResources.getAllStudentResources();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await studentResources.addStudentResource(
            req.body.name,
            req.body.description,
            req.body.link
        );
        res.json({ id: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await studentResources.removeStudentResource(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/name", async (req, res) => {
    try {
        const result = await studentResources.updateName(req.params.id, req.body.name);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/description", async (req, res) => {
    try {
        const result = await studentResources.updateDescription(req.params.id, req.body.description);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/link", async (req, res) => {
    try {
        const result = await studentResources.updateLink(req.params.id, req.body.link);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;