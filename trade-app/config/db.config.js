module.exports = {
    HOST: "postgresdb",    // ← ИЗМЕНИТЬ на postgresdb (имя сервиса в Docker)
    USER: "trade-app",     // ← ИЗМЕНИТЬ на trade-app
    PASSWORD: "123",       // ← ИЗМЕНИТЬ на 123
    DB: "trade-app-db",    // ← ИЗМЕНИТЬ на trade-app-db
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};