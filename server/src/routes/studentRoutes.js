const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const { execFile } = require('child_process');


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
        const id = await Student.addStudent({user, email, password});
        res.json({ message: "Student added successfully", id: Number(id) });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const student = await Student.login(req.body);

        // Remove password_hash before sending the response
        const { password_hash, ...adminWithoutPassword } = student;

        res.send(studentWithoutPassword);
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

// creating a new user using the script
router.post("/createUser", (req, res) => {
  const { email, nId } = req.body;

  if (!email || !nId) {
    return res.status(400).json({ success: false, error: "Missing email or nId" });
  }

  const scriptPath = "/opt/hydra-scripts/create_user.sh";

// Run the script as sudo
  const child = execFile(
    "sudo",
    ["bash", scriptPath, email, nId],
    (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing script:", error);
        return res.status(500).json({
          success: false,
          error: stderr || error.message,
        });
      }

      console.log("Script output:", stdout);
      res.json({
        success: true,
        message: "User created successfully via server script",
        output: stdout,
      });
    }
  );
});


// Get all pending requests
router.get("/pending", async (req, res) => {
  try {
    const requests = await Student.getPendingRequests();
    res.json(requests);
  } catch (err) {
    console.error("Error fetching pending requests:", err);
    res.status(500).json({ message: "Failed to fetch pending requests" });
  }
});

// Approve a request
router.put("/approve/:id", async (req, res) => {
  try {
    const rows = await Student.approveRequest(req.params.id);
    if (rows === 0) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request approved successfully" });
  } catch (err) {
    console.error("Error approving request:", err);
    res.status(500).json({ message: "Failed to approve request" });
  }
});

// Deny a request 
router.put("/:id/deny", async (req, res) => {
    try {
    const rows = await Student.denyRequest(req.params.id);
    if (rows === 0) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request denied successfully" });
    } catch (err) {
    console.error("Error denying request:", err);
    res.status(500).json({ message: "Failed to deny request" });
    }
});


module.exports = router;

