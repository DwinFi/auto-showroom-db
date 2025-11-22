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
        console.log("🔄 Loading database models...");
        
        // Загружаем модели по одной для диагностики
        db = require("./app/models");
        console.log("✅ Database models loaded");
        
        // Проверяем что все модели загружены
        console.log("📋 Loaded models:", Object.keys(db).filter(key => !['Sequelize', 'sequelize'].includes(key)));
        
        await db.sequelize.authenticate();
        console.log("✅ Database connection established");
        
        // Sync models
        console.log("🔄 Synchronizing database...");
        await db.sequelize.sync({ force: false });
        console.log("✅ Database synchronized");
        
        return db;
    } catch (error) {
        console.log("❌ Database error:", error.message);
        console.log("🔍 Error stack:", error.stack);
        return null;
    }
};

// Routes
app.get("/", (req, res) => {
    res.json({ 
        message: "Welcome to auto-showroom!",
        status: "Online",
        database: db ? "Connected" : "Disconnected"
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
console.log("🚀 Starting server initialization...");
initializeDatabase().then((database) => {
    if (database) {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🎉 Server is running on port ${PORT}`);
            console.log(`📍 http://localhost:${PORT}`);
            console.log(`🚗 API автомобилей: http://localhost:${PORT}/api/cars`);
        });
    } else {
        console.log("❌ Server started WITHOUT database connection");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`⚠️  Server is running on port ${PORT} (NO DATABASE)`);
            console.log(`📍 http://localhost:${PORT}`);
        });
    }
}).catch(error => {
    console.log("💥 Critical error during startup:", error);
    process.exit(1);
});