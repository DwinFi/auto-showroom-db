require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Database connection with error handling
let db; // Объявляем db в глобальной области видимости

const initializeDatabase = async () => {
    try {
        db = require("./app/models");
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

// Routes
app.get("/", (req, res) => {
    res.json({ 
        message: "Welcome to auto-showroom!",
        status: "Online",
        database: "Connected"
    });
});

// Маршрут для получения всех автомобилей
app.get("/api/cars", async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const cars = await db.cars.findAll();
        res.json({
            message: "Список автомобилей",
            count: cars.length,
            data: cars
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Маршрут для создания нового автомобиля
app.post("/api/cars", async (req, res) => {
    try {
        if (!db) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const newCar = await db.cars.create(req.body);
        res.json({
            message: "Автомобиль добавлен",
            data: newCar
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server after DB initialization
initializeDatabase().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📍 http://localhost:8080`);
        console.log(`🚗 API автомобилей: http://localhost:8080/api/cars`);
    });
});