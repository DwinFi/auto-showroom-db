require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({ 
        message: "Welcome to Trade App!",
        status: "Online",
        database: "Connected"
    });
});

// Database connection with error handling
const initializeDatabase = async () => {
    try {
        const db = require("./app/models");
        console.log("✅ Database models loaded");
        
        await db.sequelize.authenticate();
        console.log("✅ Database connection established");
        
        // Sync models
        await db.sequelize.sync();
        console.log("✅ Database synchronized");
        
        return db;
    } catch (error) {
        console.log("❌ Database error:", error.message);
        return null;
    }
};

// Start server after DB initialization
initializeDatabase().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📍 http://localhost:6868`);
    });
});