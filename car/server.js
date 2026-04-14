require('dotenv').config();
const express = require("express");
const cors = require("cors"); // 🔥 ДОБАВИЛ
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 8080;

// 🔥 CORS настройка
app.use(cors({
    origin: "*", // можно потом ограничить
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

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

// Routes
require("./app/routes/motorcycle.routes")(app);
require("./app/routes/manufacturer.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/manager.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/orderitem.routes")(app);
require("./app/routes/debug.routes")(app);

// Главная
app.get("/", (req, res) => {
    res.json({
        message: "Мотосалон API работает",
        swagger: `http://localhost:${PORT}/api-docs`
    });
});

// Start
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server: http://localhost:${PORT}`);
    });
});