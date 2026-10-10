const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
    res.json({
        message: "BlogSphere Backend is running!",
    });
});

// Ensure MongoDB is connected before handling API requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection error:", error.message);
        res.status(500).json({
            message: "Database connection failed",
        });
    }
});

module.exports = app;