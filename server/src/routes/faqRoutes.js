const express = require("express");
const router = express.Router();
const faqs = require('../models/faqModel');

router.get("/", async (req, res) => {
    try {
        const rows = await faqs.getAllFAQs();
        res.json(rows);
    } catch (err) {
        res.status(501).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const faq = await faqs.getFaqByID(req.params.id);
        res.json(faq);
    } catch (err) {
        console.error("Error in getFAQById route:", err);
        res.status(500).json({ message: "Failed to fetch FAQ", error: err.message });
    }
});

//add faq
router.post("/", async (req, res) => {
    try {
        const result = await faqs.addFAQ(req.body);
        res.status(201).json({ id: result, message: "FAQ added successfully" }); // Return a clear success response
    } catch (err) {
        console.error("Error in addFAQ route:", err);
        res.status(500).json({ message: "Failed to add FAQ", error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await faqs.deleteFAQ(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/question", async (req, res) => {
    try {
        const result = await faqs.updateQuestion(req.params.id, req.body.question);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id/answer", async (req, res) => {
    try {
        const result = await faqs.updateAnswer(req.params.id, req.body.answer);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//edit all columns
router.put("/:id", async (req, res) => {
    try {
        const result = await faqs.updateFAQ(req.params.id, req.body);
        res.json({ affectedRows: result, message: "FAQ updated successfully" });
    } catch (err) {
        console.error("Error in updateFAQ route:", err);
        res.status(500).json({ message: "Failed to update FAQ", error: err.message });
    }
});

module.exports = router;


