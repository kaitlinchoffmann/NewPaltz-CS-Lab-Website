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
        const result = await studentResources.addStudentResource(req.body);
        res.status(201).json({ message: "Student highlight added successfully" });
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

router.put("/:id", async (req, res) => {
    try {
        const result = await studentResources.editStudentResource(req.params.id, req.body);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const resource = await studentResources.getResourceByID(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Student resource not found" });
        }
        console.log("Sending student resource:", resource);
        res.json(resource); // Send the resource object
    } catch (err) {
        console.error("Error getting student resource by ID:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;