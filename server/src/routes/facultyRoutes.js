const express = require("express");
const router = express.Router();
const faculty = require('../models/facultyModel');

router.get("/", async (req, res) => {
    try {
        const rows = await faculty.getAllFaculty();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//add faculty
router.post("/", async (req, res) => {
    try {
        const result = await faculty.addFaculty(req.body);
        res.status(201).json({ id: result.toString(), message: "FAQ added successfully" }); // Return a clear success response
    } catch (err) {
        console.error("Error adding faculty:", err);
        res.status(500).json({ message: err.message });
    }
});

//get faculty by id
router.get("/:id", async (req, res) => {
    try {
        const row = await faculty.getFacultyById(req.params.id);
        res.json(row);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//edit all columns
router.put("/:id", async (req, res) => {
    try {
        const result = await faculty.editFaculty(req.params.id, req.body);
        res.json({ affectedRows: result, message: "Faculty Member updated successfully"  });
    } catch (err) {
        console.error("Cannot Update Faculty Member", err)
        res.status(500).json({ message: err.message });
    }
});


//delete faculty
router.delete("/:id", async (req, res) => {
    try {
        const result = await faculty.removeFaculty(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;

