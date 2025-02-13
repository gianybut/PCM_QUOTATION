import express from "express";

// Setup variables
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 6969;

// Making the server live
app.listen(SERVER_PORT, () => {
  console.log(`Express server started at port: ${SERVER_PORT}`);
});
