const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');


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

    try {
        const id = await Admin.addAdmin(user, email, password);
        res.json({ message: "Admin added successfully", id: Number(id) });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get an admin by ID
router.get('/admin-panel/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.getAdminById(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        console.error("Error fetching admin by ID:", err); // Log the error for debugging
        res.status(500).json({ error: err.message });
    }
    
});

// Route to edit an admin by ID
router.put('/admin-panel/:id', async (req, res) => {
    const { id } = req.params;
    const { user, email, role } = req.body;

    try {
        const updatedAdmin = await Admin.editAdminById(id, user, email, role );
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin updated successfully", updatedAdmin });
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

// Route to delete an admin by ID
router.delete('/admin-panel/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid admin ID" });
    }

    try {
        const deletedAdmin = await Admin.deleteAdmin(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully" });
    } catch (err) {
        console.error("Error deleting admin:", err); // Log the error for debugging
        res.status(500).json({ error: err.message });
    }
});

// Route to check if a username is available
router.get('/check-username/:user', async (req, res) => {
    const { user } = req.params;

        const isAvailable = await Admin.isUserAvailable(user);
        res.json({ available: isAvailable });
});

// Route to check if an email is available
router.get('/check-email/:email', async (req, res) => {
    const { email } = req.params;
    const isAvailable = await Admin.isEmailAvailable(email);
    res.json({ available: isAvailable });

});

module.exports = router;

