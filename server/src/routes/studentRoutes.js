const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');


router.get('/', async (req, res) => {
    try {
        const students = await Student.getAllStudents();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to add a new student
router.post('/', async (req, res) => {
    const { user, email, password } = req.body;

    try {
        const id = await Student.addStudent(user, email, password);
        res.json({ message: "Student added successfully", id: Number(id) });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const student = await Student.login(req.body);

        // Remove password_hash before sending the response
        const { password_hash, ...adminWithoutPassword } = admin;

        res.send(adminWithoutPassword);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

// Route to delete an student by ID
router.delete('/student-panel/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }

    try {
        const deletedStudent = await Student.deleteStudent(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        console.error("Error deleting student:", err); // Log the error for debugging
        res.status(500).json({ error: err.message });
    }
});

// Route to check if a username is available
router.get('/check-username/:user', async (req, res) => {
    const { user } = req.params;

        const isAvailable = await Student.isUserAvailable(user);
        res.json({ available: isAvailable });
});

// Route to check if an email is available
router.get('/check-email/:email', async (req, res) => {
    const { email } = req.params;
    const isAvailable = await Student.isEmailAvailable(email);
    res.json({ available: isAvailable });

});

app.post("/createUser", (req, res) => {
  const { email, nId } = req.body;
  execFile("./create_user.sh", [email, nId], (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(stderr);
    }
    res.send(stdout || "User created successfully");
  });
});

module.exports = router;

