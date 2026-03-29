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
            title: "Moto Showroom API",
            version: "1.0.0",
            description: "API documentation for Moto Showroom project",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: [
        "./app/routes/motorcycle.routes.js",
        "./app/routes/manufacturer.routes.js",
        "./app/routes/category.routes.js",
        "./app/routes/client.routes.js",
        "./app/routes/manager.routes.js",
        "./app/routes/order.routes.js",
        "./app/routes/orderitem.routes.js",
        "./app/routes/debug.routes.js"
    ],
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
        console.log(
            "📋 Loaded models:",
            Object.keys(db).filter(key => !['Sequelize', 'sequelize'].includes(key))
        );

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
require("./app/routes/motorcycle.routes")(app);
require("./app/routes/manufacturer.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/manager.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderitem.routes")(app);
require("./app/routes/debug.routes")(app);

// Главная страница
app.get("/", (req, res) => {
    res.json({
        message: "Добро пожаловать в мотосалон!",
        status: "Online",
        database: db ? "Connected" : "Disconnected",
        swagger_docs: `http://localhost:${PORT}/api-docs`,
        available_endpoints: [
            "GET /api/motorcycles",
            "POST /api/motorcycles",
            "GET /api/motorcycles/:id",
            "PUT /api/motorcycles/:id",
            "DELETE /api/motorcycles/:id",
            "GET /api/motorcycles/:id/category",
            "GET /api/motorcycles/:id/categoryname",

            "GET /api/manufacturers",
            "POST /api/manufacturers",
            "GET /api/manufacturers/:id",
            "PUT /api/manufacturers/:id",
            "DELETE /api/manufacturers/:id",

            "GET /api/categories",
            "POST /api/categories",
            "GET /api/categories/:id",
            "PUT /api/categories/:id",
            "DELETE /api/categories/:id",

            "GET /api/clients",
            "POST /api/clients",
            "GET /api/clients/:id",
            "PUT /api/clients/:id",
            "DELETE /api/clients/:id",

            "GET /api/managers",
            "POST /api/managers",
            "GET /api/managers/:id",
            "PUT /api/managers/:id",
            "DELETE /api/managers/:id",

            "GET /api/orders",
            "POST /api/orders",
            "GET /api/orders/:id",
            "PUT /api/orders/:id",
            "DELETE /api/orders/:id",

            "GET /api/orderitems",
            "POST /api/orderitems",
            "GET /api/orderitems/:id",
            "PUT /api/orderitems/:id",
            "DELETE /api/orderitems/:id",

            "GET /api/debug/db"
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