const Sequelize = require("sequelize");
const sequelize = require("../db");
const { DataTypes } = Sequelize;
const productTable = sequelize.define(
    "productTable",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: DataTypes.STRING(30),
            defaultValue: "Test Product",
        },
        productDescription: {
            type: DataTypes.STRING(100),
            defaultValue: "Test Product Description",
        },
        productCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

module.exports = productTable;
