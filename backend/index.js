import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import ProductRoute from "./Routes/ProductRoutes.js";
import SizesRoute from "./Routes/SizesRoute.js";
import ProductsModel from "./Model/ProductsModel.js";
import SizesModel from "./Model/SizesModel.js";

import PRODUCTS from "./PRODUCTS.json" with { type: "json" };
import SIZES from "./SIZES.json" with { type: "json" };

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 6942;
const MONGODB_URI = process.env.MONGODB_URI;
let serverInstance = null;

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(cors({ origin: "http://localhost:5173" }));

let activeClients = 0;
let shutdownTimer = null;

app.get("/keepalive", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  activeClients++;
  console.log(`Client connected. Active clients: ${activeClients}`);
  if (shutdownTimer) {
    clearTimeout(shutdownTimer);
    shutdownTimer = null;
    console.log("Shutdown cancelled (client connected).");
  }

  // Send initial message
  res.write(": keepalive\n\n");

  req.on("close", () => {
    activeClients--;
    console.log(`Client disconnected. Active clients: ${activeClients}`);
    if (activeClients <= 0) {
      console.log("No active clients. Scheduling shutdown in 5 seconds...");
      shutdownTimer = setTimeout(() => {
        console.log("No client reconnected. Shutting down...");
        serverInstance?.close();
        mongoose.disconnect();
        process.exit(0);
      }, 5000);
    }
  });
});

app.get("/db-status", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({ connected: isConnected });
});

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
  try {
    await ProductsModel.insertMany(PRODUCTS.map(p => ({ productName: p["productName"], productType: p["productType"] })), { ordered: false }).catch(() => {});
    await SizesModel.insertMany(SIZES.map(s => ({ sizeName: s["sizeName"], sizeFor: s["sizeFor"] })), { ordered: false }).catch(() => {});
    return res.send("OK");
  } catch (error) {
    return res.status(500).json({ message: "Failed to seed data." });
  }
});

const gracefulShutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  if (serverInstance) serverInstance.close();
  mongoose.disconnect().finally(() => process.exit(0));
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
