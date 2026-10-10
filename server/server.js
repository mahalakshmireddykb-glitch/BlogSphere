const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");



const app = express();
connectDB();
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "BlogSphere Backend is running!"
    });
});

const PORT = process.env.PORT || 5000;

module.exports = app;