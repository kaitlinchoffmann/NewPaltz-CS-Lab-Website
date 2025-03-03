const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');

// Route to get all admins (for debugging)
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.getAllAdmins();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to add a new admin
router.post('/', async (req, res) => {
    const { user, email, password } = req.body;
    
    if (!user || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const id = await Admin.addAdmin(user, email, password);
        res.json({ message: "Admin added successfully", id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.login(req.body);

        // Remove password_hash before sending the response
        const { password_hash, ...adminWithoutPassword } = admin;

        res.send(adminWithoutPassword);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

module.exports = router;

