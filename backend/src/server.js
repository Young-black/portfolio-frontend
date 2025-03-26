const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const contactRoutes = require("./routes/contact");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON requests

// Serve static files from the frontend directory
const frontendDir = path.join(__dirname, "../../frontend");
app.use(express.static(frontendDir));

// API Routes
app.use("/api/contact", contactRoutes);

// Catch-all route to serve the frontend's index.html for all unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
