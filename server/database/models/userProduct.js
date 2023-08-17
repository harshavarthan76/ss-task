const Sequelize = require("sequelize");
const sequelize = require("../db");
const { DataTypes } = Sequelize;
const userTable = require("./user");
const productTable = require("./product");

const userProduct = sequelize.define(
    "userProduct",
    {
        userProductId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "user_product_id",
        },
    },
    {
        paranoid: true,
    }
);
userTable.belongsToMany(productTable, { through: userProduct });
productTable.belongsToMany(userTable, { through: userProduct });

module.exports = userProduct;
