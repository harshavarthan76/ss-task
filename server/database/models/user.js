const Sequelize = require("sequelize");
const sequelize = require("../db");
const { DataTypes } = Sequelize;
const userTable = sequelize.define(
    "userTable",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.SMALLINT,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

module.exports = userTable;
