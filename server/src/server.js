
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const faqRoutes = require("./routes/faqRoutes.js");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentResourcesRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/faqs", faqRoutes);
app.use("/faculty", facultyRoutes);
app.use("/students", studentRoutes);


app.get("/", (req, res) => {
    res.send("CS Department Website API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
