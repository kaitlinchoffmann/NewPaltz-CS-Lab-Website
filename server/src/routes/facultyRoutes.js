const express = require("express");
const router = express.Router();
const faculty = require('../models/facultyModel');

router.get("/", async (req, res) => {
    try {
        const rows = await faculty.getAllFaculty();
        console.log('Sending faculty data: ', rows);
        res.json(rows);
    } catch (err) {
        console.log('Error getting faculty data:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await faculty.addFaculty(
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
        const result = await faculty.removeFaculty(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/email", async (req, res) => {
    try {
        const result = await faculty.updateEmail(req.params.id, req.body.email);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/office", async (req, res) => {
    try {
        const result = await faculty.updateOffice(req.params.id, req.body.office);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/office_hours", async (req, res) => {
    try {
        const result = await faculty.updateOfficeHours(req.params.id, req.body.office_hours);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 

router.put("/:id/expertise", async (req, res) => {
    try {
        const result = await faculty.updateExpertise(req.params.id, req.body.expertise);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;

