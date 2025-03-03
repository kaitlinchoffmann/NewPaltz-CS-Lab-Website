const express = require("express");
const router = express.Router();
const faqs = require('../models/faqModel');

router.get("/", async (req, res) => {
    try {
        const rows = await faqs.getAllFAQs();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await faqs.addFAQ(
            req.body.question,
            req.body.answer
        );
        res.json({ id: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await faqs.removeFAQ(req.params.id);
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

module.exports = router;


