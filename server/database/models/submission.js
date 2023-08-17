const Sequelize = require("sequelize");
const sequelize = require("../db");
const { DataTypes } = Sequelize;
const userTable = require("./user");
// const Hooks = require("../../hooks/submission");

const submission = sequelize.define(
    "submission",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        paranoid: true,
    }
);

userTable.hasOne(submission);
submission.belongsTo(userTable);

// submissionTable.afterCreate(Hooks.afterCreate);
// submissionTable.afterUpdate(Hooks.afterUpdate);
// submissionTable.afterDestroy(Hooks.afterDelete);

module.exports = submission;
