const directory = require("require-directory");

module.exports = directory(module, {
    exclude: ["index.js"],
});
