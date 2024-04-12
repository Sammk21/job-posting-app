
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/Company");
const categoryRoutes = require("./routes/categoryRoute");
const emailRoutes = require("./routes/emailRoutes");
const applicationRoutes = require ("./routes/applicationRoute");
const personalDetailRoute = require("./routes/personalDetailRoute");
const path = require("path");

const app = express();


app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/companies", companyRoutes);
app.use("/categories", categoryRoutes)
app.use("/email", emailRoutes);
app.use("/applications", applicationRoutes);
app.use("/personalInfo", personalDetailRoute);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));







const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



