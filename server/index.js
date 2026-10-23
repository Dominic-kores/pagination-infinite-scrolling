
import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./src/routes/productRoutes.js";

const app = express();

const PORT = process.env.PORT || 5002;

// Enable CORS for frontend requests.
app.use(cors());

// Parse incoming JSON request bodies.
app.use(express.json());

// Basic health-check endpoint.
app.get("/", (req, res) => {
  res.json({
    message: "Pagination API is running.",
  });
});

// Product API routes.
app.use("/api/products", productRoutes);

// Handle undefined routes.
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

// Centralized error-handling middleware.
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error.",
  });
});

// Start the HTTP server.
app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});
