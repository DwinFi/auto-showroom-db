require('dotenv').config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// ===== Swagger configuration =====
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Car Dealership API",
            version: "1.0.0",
            description: "API documentation for Car Dealership project (Lab 13)",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./app/routes/*.js"], // путь к маршрутам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
        
        await db.sequelize.sync();
        console.log("✅ Database synchronized");
        
        return db;
    } catch (error) {
        console.log("❌ Database error:", error.message);
        return null;
    }
};

// Регистрация маршрутов
require("./app/routes/car.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/manager.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderitem.routes")(app);
require("./app/routes/debug.routes")(app);

// Главная страница
app.get("/", (req, res) => {
    res.json({ 
        message: "Добро пожаловать в автосалон!",
        status: "Online",
        database: db ? "Connected" : "Disconnected",
        swagger_docs: `http://localhost:${PORT}/api-docs`,
        available_endpoints: [
            "GET /api/cars",
            "POST /api/cars",
            "GET /api/cars/:id",
            "PUT /api/cars/:id",
            "DELETE /api/cars/:id",
            "GET /api/categories",
            "POST /api/categories",
            "GET /api/clients",
            "POST /api/clients",
            "GET /api/managers",
            "POST /api/managers",
            "GET /api/orders",
            "POST /api/orders"
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
            console.log(`📘 Swagger: http://localhost:${PORT}/api-docs`);
        });
    } else {
        console.log("❌ Server started WITHOUT database connection");
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`⚠️ Server is running on port ${PORT} (NO DATABASE)`);
        });
    }
});