import express from "express";
import mongoose from "mongoose";

// Setup variables
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 6969;
const MONGODB_URI = process.env.MONGODB_URI;

// Making the server live
await mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    // Starting server
    app.listen(SERVER_PORT, () => {
      console.log(`Express server started at port: ${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed.");
  });
