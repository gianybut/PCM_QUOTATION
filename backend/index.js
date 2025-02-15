import express from "express";
import mongoose from "mongoose";

import { StatusCodes } from "http-status-codes";
import ProductsController from "./Controller/ProductsController.js";
import ProductModel from "./Model/ProductsModel.js";

// Setup variables
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 6969;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

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

// getProductResult[0]["_id"].toString() -- this is how to access product ID
// productToUpdate["productSizes"].forEach((key, value) => {
//   console.log(`${key} and Php ${value}`);                  -- to access productSizes, treat it like a JSON
// });
app.get("/products", async (req, res) => {
  return res.status(StatusCodes.OK).send("OK");
});
