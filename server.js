const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());


// // Global Middleware to Log All Incoming Requests
// app.use((req, res, next) => {
//   console.log(`
//         ==============================
//         🚀 Incoming Request
//         ➡ Method: ${req.method}
//         ➡ URL: ${req.originalUrl}
//         ➡ Time: ${new Date().toISOString()}
//         ➡ Body: ${JSON.stringify(req.body)}
//         ==============================
//   `);
//   next();
// });

// Start database connection
mongoose.connect(process.env.MONGODB_URL, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);

// Start server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
