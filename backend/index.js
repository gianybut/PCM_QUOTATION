import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRoute from "./Routes/ProductRoutes.js";
import SizesRoute from "./Routes/SizesRoute.js";
import axios from "axios";

import PRODUCTS from "./PRODUCTS.json" with { type: "json" };
import SIZES from "./SIZES.json" with { type: "json" };
// Setup variables
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 6942;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/products", ProductRoute);
app.use("/sizes", SizesRoute);

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

app.get("/addAllProductsAndSizes", async (req, res) => {
  PRODUCTS.forEach(async (p) => {
    await axios.post("http://localhost:6942/products/create", {productName: p["productName"], productType: p["productType"]});
  });

  SIZES.forEach(async (s) => {
    await axios.post("http://localhost:6942/sizes/create", {sizeName: s["sizeName"]});
  });
  return res.send("OK");
});
