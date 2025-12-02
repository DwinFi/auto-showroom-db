module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        categoryCode: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        baseCategoryCode: {
            type: Sequelize.INTEGER,
            allowNull: true // для иерархии категорий
        }
    }, {
        tableName: 'categories',
        timestamps: false,
        freezeTableName: true,
        underscored: false
    });
    return Category;
};