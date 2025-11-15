const express = require('express');
const router = express.Router();
const sdForms = require('../models/sdFormsModel');
const nodemailer = require("nodemailer");


//get all Server/Database form data
router.get('/', async (req, res) => {
    
    try {
        const rows = await sdForms.getAllSDForms();
        res.json(rows);
    } catch (err) {
        console.error('Error getting sdForm:', err);
        res.status(500).json({ message: err.message });
    }  
});


//add a new request form
router.post('/', async (req, res) => {
    try {
        console.log('req.body: ', req.body);
        await sdForms.addSDForm(req.body);
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//delete a form by id
router.delete('/:id', async (req, res) => {
   try {
        // 1. Get the student's email by ID
        const form = await sdForms.getSDFormById(req.params.id);
        if (!form) return res.status(404).json({ message: "Form not found" });

        const { email, full_name } = form;

        // 2. Send the denial email to the student
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_USER,
            to: email,
            subject: "Your Server/Database Request Was Denied",
            text: `Dear ${full_name},\n\nWe're sorry, but your request for server/database access has been denied.\n\nIf you have questions, please contact the lab admin.`,
        });

        // 3. Delete the form
        const result = await sdForms.deleteForm(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        console.error("Error denying request:", err);
        res.status(500).json({ message: "Failed to deny request" });
    }
    }
);

// Get a Server/Database form by ID
router.get('/:id', async (req, res) => {
    try {
        const form = await sdForms.getSDFormById(req.params.id);
        if (!form) return res.status(404).json({ message: "Form not found" });
        res.json(form);
    } catch (err) {
        console.error('Error getting sdForm by id:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/approve', async (req, res) => {
    try {
        const form = await sdForms.getSDFormById(req.params.id);
        if (!form) return res.status(404).json({ message: "Form not found" });

        const { email, full_name } = form;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_USER,
            to: email,
            subject: "Your Server/Database Request Was Approved",
            text: `Dear ${full_name},\n\nCongratulations! Your request for server/database access has been approved.\n\nIf you have questions, please contact the lab admin.`,
        });

        res.json({ success: true, message: "Approval email sent." });
    } catch (err) {
        console.error("Error approving request:", err);
        res.status(500).json({ message: "Failed to send approval email" });
    }
});

module.exports = router;