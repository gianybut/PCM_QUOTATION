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
let serverInstance = null;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Heartbeat state for auto-shutdown when browser closes
let lastHeartbeat = Date.now();
let hasReceivedHeartbeat = false;

app.post("/heartbeat", (req, res) => {
  lastHeartbeat = Date.now();
  hasReceivedHeartbeat = true;
  res.sendStatus(200);
});

app.get("/db-status", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ connected: isConnected });
});

// Periodically check if heartbeats have stopped (indicating browser has closed)
setInterval(() => {
  if (hasReceivedHeartbeat && Date.now() - lastHeartbeat > 10000) {
    console.log("No heartbeat received for 10 seconds. Shutting down system...");
    process.exit(0);
  }
}, 5000);

app.use("/products", ProductRoute);
app.use("/sizes", SizesRoute);

const startServer = () => {
  if (serverInstance) {
    return;
  }

  serverInstance = app.listen(SERVER_PORT, () => {
    console.log(`Express server started at port: ${SERVER_PORT}`);
  });

  serverInstance.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.warn(
        `Port ${SERVER_PORT} is already in use. Reusing the existing backend process if it belongs to this app.`
      );
      return;
    }

    console.error("Failed to start Express server:", error);
  });
};

startServer();

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected successfully.");
    })
    .catch((err) => {
      console.error(
        "MongoDB connection failed. Running with local fallback data:",
        err
      );
    });
} else {
  console.warn(
    "MONGODB_URI is not configured. Running with local fallback data."
  );
}

app.get("/addAllProductsAndSizes", async (req, res) => {
  PRODUCTS.forEach(async (p) => {
    await axios.post("http://localhost:6942/products/create", {productName: p["productName"], productType: p["productType"]});
  });

  SIZES.forEach(async (s) => {
    await axios.post("http://localhost:6942/sizes/create", {sizeName: s["sizeName"], sizeFor: s["sizeFor"]});
  });
  return res.send("OK");
});
