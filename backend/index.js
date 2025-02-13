import express from "express";

// Setup variables
const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.listen(5000, () => {
  console.log(`Express server started at port: ${SERVER_PORT}`);
});
