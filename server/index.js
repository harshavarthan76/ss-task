"use strict";

const hapi = require("hapi");
const sequelize = require("./database/db");
// const userTable = require("./database/models/user");
// const productTable = require("./database/models/product");
// const submissionTable = require("./database/models/submission");
// const userProduct = require("./database/models/userProduct");

sequelize.sync({ alter: false });


const server = new hapi.Server();

server.connection({
    port: 1111,
    host: "localhost",
});

server.route(require("./routes"));

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});