const express = require("express");
const colors = require('colors');
const morgan = require('morgan');
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("🍔 ".rainbow + "Connected to MongoDB Atlas!".brightGreen.bold))
  .catch((err) => console.log("❌ ".red + "MongoDB connection error:".bold, err.red));

// Colorful welcome message
console.log(`
███████╗ ██████╗ ███╗   ███╗ █████╗ ████████╗ ██████╗ 
╚══███╔╝██╔═══██╗████╗ ████║██╔══██╗╚══██╔══╝██╔═══██╗
  ███╔╝ ██║   ██║██╔████╔██║███████║   ██║   ██║   ██║
 ███╔╝  ██║   ██║██║╚██╔╝██║██╔══██║   ██║   ██║   ██║
███████╗╚██████╔╝██║ ╚═╝ ██║██║  ██║   ██║   ╚██████╔╝
╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ 
`.brightYellow);

// Routes
app.get("/", (req, res) => {
  res.send(`
    <div style="text-align: center; font-family: Arial; background-color: #f5f5f5; padding: 50px;">
      <h1 style="color: #ff6b6b;">🍕 Welcome to Zomato Clone API! 🍔</h1>
      <p style="color: #666;">Available endpoints:</p>
      <ul style="display: inline-block; text-align: left; color: #444;">
        <li>GET /restaurants - List all restaurants</li>
        <li>GET /restaurants/:id - Get restaurant details</li>
        <li>POST /restaurants - Add new restaurant</li>
        <li>POST /users/register - User registration</li>
        <li>POST /users/login - User login</li>
      </ul>
    </div>
  `);
});

// Restaurant Routes
const restaurantRoutes = require('./routes/restaurantRoutes');
app.use('/restaurants', restaurantRoutes);

// User Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "🔍 - Not Found - The requested resource doesn't exist",
    suggestion: "Try /restaurants or /users endpoints"
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 ".red + err.stack);
  res.status(500).json({
    success: false,
    message: "💥 Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 `.brightMagenta + `Server running on`.brightWhite + ` http://localhost:${PORT}`.underline.blue);
  console.log(`🌐 `.brightCyan + `Try visiting`.brightWhite + ` http://localhost:${PORT}/restaurants`.underline.blue);
});