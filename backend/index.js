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

app.post("/shutdown", (req, res) => {
  console.log("Shutdown signal received. Exiting...");
  res.sendStatus(200);
  serverInstance.close();
  mongoose.disconnect();
  process.exit(0);
});

app.get("/db-status", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ connected: isConnected });
});

// Periodically check if heartbeats have stopped (indicating browser has closed)
setInterval(() => {
  if (hasReceivedHeartbeat && Date.now() - lastHeartbeat > 90000) {
    console.log("No heartbeat received for 90 seconds. Shutting down system...");
    serverInstance?.close();
    mongoose.disconnect();
    process.exit(0);
  }
  if (!hasReceivedHeartbeat && Date.now() - lastHeartbeat > 180000) {
    console.log("No heartbeat ever received after 3 minutes. Shutting down...");
    serverInstance?.close();
    mongoose.disconnect();
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
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    })
    .then(() => {
      console.log("MongoDB connected successfully.");
    })
    .catch((err) => {
      console.error(
        "MongoDB connection failed. Running with local fallback data:",
        err.message
      );
    });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected. System will use local data until reconnected.");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected successfully.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });
} else {
  console.warn(
    "MONGODB_URI is not configured. Running with local fallback data."
  );
}

app.get("/addAllProductsAndSizes", async (req, res) => {
  for (const p of PRODUCTS) {
    await axios.post("http://localhost:6942/products/create", {productName: p["productName"], productType: p["productType"]});
  }

  for (const s of SIZES) {
    await axios.post("http://localhost:6942/sizes/create", {sizeName: s["sizeName"], sizeFor: s["sizeFor"]});
  }
  return res.send("OK");
});
