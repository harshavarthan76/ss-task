const Sequelize = require("sequelize");

const sequelize = new Sequelize("userapp", "harshavarthanmalairaj", null, {
    host: "localhost",
    dialect: "postgres",
    define: {
        freezeTableName: true,
    },
});

module.exports = sequelize;