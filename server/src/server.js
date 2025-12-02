require("dotenv").config();
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const faqRoutes = require("./routes/faqRoutes.js");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentResourcesRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const techBlogRoutes = require("./routes/techBlogPostsRoutes");
const studentHighlightRoutes = require("./routes/StudentHighlightRoutes");
const sdFormRoutes = require("./routes/sdFormRoutes");

const eventRoutes = require("./routes/eventRoutes");
const coursesRoutes = require("./routes/coursesRoutes");
const compExamRoutes = require("./routes/compExamRoutes");

let adminProxy;

try {
  // Try real proxy (only exists on production server)
  adminProxy = require("./routes/adminProxy");
  console.log("Loaded REAL adminProxy.js");
} catch (err) {
  console.warn("adminProxy.js not found — using MOCK adminProxy instead.");
  adminProxy = require("./routes/adminProxy.local.js");
}

const student2Routes = require("./routes/studentRoutes");

const app = express();
const nodemailer = require("nodemailer");

const path = require("path");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/faq", faqRoutes);
app.use("/faculty", facultyRoutes);
app.use("/student-resources", studentRoutes); 
app.use("/admins", adminRoutes);
app.use("/auth", authRoutes);
app.use("/tech-blog", techBlogRoutes);
app.use("/student-highlights", studentHighlightRoutes);
app.use("/sd-forms", sdFormRoutes);
app.use("/student", student2Routes);
app.use("/events", eventRoutes);
app.use("/api/events", eventRoutes);
app.use("/courses", coursesRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/comp-exam", compExamRoutes);
app.use("/api/comp-exam", compExamRoutes);


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/scripts", adminProxy); 

// Uncomment the following lines to enable these routes when needed

/*
app.use("/api/faq", faqRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student-resources", studentRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tech-blog", techBlogRoutes);
app.use("/api/student-highlights", studentHighlightRoutes);
app.use("/api/sd-forms", sdFormRoutes);
*/
// waiting to implement
// app.use("/api/profile", require("./src/routes/profileRoutes"));

app.get("/", (req, res) => {
    res.send("CS Department Website API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS,
  },
});

app.post("/send-alert", async (req, res) => {
  try {
    const { subject, message } = req.body;
    await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to: "alejilal1@newpaltz.edu",
      subject,
      text: message,
    });
    res.json({ success: true, msg: "Email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Email failed." });
  }
});


