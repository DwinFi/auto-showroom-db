require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Database connection
let db;

const initializeDatabase = async () => {
    try {
        console.log("🔄 Loading database models...");
        db = require("./app/models");
        console.log("✅ Database models loaded");
        console.log("📋 Loaded models:", Object.keys(db).filter(key => !['Sequelize', 'sequelize'].includes(key)));
        
        await db.sequelize.authenticate();
        console.log("✅ Database connection established");
        
        await db.sequelize.sync({ force: false });
        console.log("✅ Database synchronized");
        
        return db;
    } catch (error) {
        console.log("❌ Database error:", error.message);
        return null;
    }
};

// Регистрация ВСЕХ маршрутов из файлов routes
require("./app/routes/car.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/manager.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderitem.routes")(app);

// Главная страница с информацией о всех endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "Добро пожаловать в автосалон!",
        status: "Online",
        database: db ? "Connected" : "Disconnected",
        available_endpoints: [
            "GET /api/cars - Получить все автомобили",
            "POST /api/cars - Создать новый автомобиль", 
            "GET /api/cars/:id - Получить автомобиль по ID",
            "PUT /api/cars/:id - Обновить автомобиль по ID",
            "DELETE /api/cars/:id - Удалить автомобиль по ID",
            "DELETE /api/cars - Удалить все автомобили",
            "GET /api/categories - Получить все категории",
            "POST /api/categories - Создать новую категорию",
            "GET /api/categories/:id - Получить категорию по ID",
            "GET /api/clients - Получить всех клиентов",
            "POST /api/clients - Создать нового клиента",
            "GET /api/managers - Получить всех менеджеров",
            "POST /api/managers - Создать нового менеджера",
            "GET /api/orders - Получить все заказы",
            "POST /api/orders - Создать новый заказ"
        ]
    });
});

// Start server
console.log("🚀 Starting server initialization...");
initializeDatabase().then((database) => {
    if (database) {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🎉 Сервер запущен на порту ${PORT}`);
            console.log(`📍 Основной URL: http://localhost:${PORT}`);
            console.log(`🚗 API автомобилей: http://localhost:${PORT}/api/cars`);
            console.log(`📂 API категорий: http://localhost:${PORT}/api/categories`);
            console.log(`👥 API клиентов: http://localhost:${PORT}/api/clients`);
            console.log(`👨‍💼 API менеджеров: http://localhost:${PORT}/api/managers`);
            console.log(`📋 API заказов: http://localhost:${PORT}/api/orders`);
        });
    } else {
        console.log("❌ Server started WITHOUT database connection");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`⚠️ Server is running on port ${PORT} (NO DATABASE)`);
        });
    }
});