const submissionHelper = require("../helpers/submissionfunctions");
const submission = require("../database/models/submission");
const sequelize = require("../database/db");

const findAllSubmissions = async (req, rep) => {
    try {
        const options = {
            group: ["answer"],
            attributes: ["answer", [sequelize.fn('COUNT', sequelize.col('id')), 'count']]
        };
        const submissions = await submissionHelper.findAllSubmissions({ options });
        const count = await submission.count();
        console.log("🚀 ~ file: submission.js:9 ~ findAllSubmissions ~ submissions:", submissions)
        rep({ submissions, count }).code(200);
    } catch (e) {
        console.log("Error : ", e);
        rep("Error while fetching the answers").code(500);
    }
}

module.exports = {
    findAllSubmissions,
}