require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const faqRoutes = require("./routes/faqRoutes.js");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentResourcesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/faq", faqRoutes);
app.use("/faculty", facultyRoutes);
app.use("/student-resources", studentRoutes); 
app.use("/admins", adminRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("CS Department Website API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
