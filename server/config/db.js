const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = mongoose.connection.readyState === 1;

  console.log("MongoDB connected successfully");
};

module.exports = connectDB;