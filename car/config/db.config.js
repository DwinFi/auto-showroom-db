module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "car_user",
    PASSWORD: process.env.DB_PASSWORD || "9524",
    DB: process.env.DB_NAME || "car_dealership_db",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};