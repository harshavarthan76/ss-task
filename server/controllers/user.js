const bcrypt = require("bcrypt");
const ProductTable = require("../database/models/product");
const redis = require("../database/redis");
const {
    findSubmission,
    getSubmissions,
    filterSubmissions,
} = require("../helpers/submissionfunctions");

const {
    findAllUsers,
    findOneUser,
    newUser,
    updateUser,
    destroyUser,
    findCount,
    submitAnswer,
    loginuser
} = require("../helpers/userfunctions");

const blank = async (req, rep) => {
    rep("hiiii there").code(200);
};

const allusers = async (req, rep) => {
    try {
        const where = {};
        const attributes = []
        const others = { order: [["id", "ASC"]] };
        const result = await findAllUsers(where, attributes, others);
        result.forEach((element) => {
            console.log(element.toJSON());
        });
        rep(result);
    } catch (err) {
        console.log("\n\n*****************Error*************\n\n", err);
        rep("Error while fecthing the data").code(400);
    }
};

const getuser = async (req, rep) => {
    // try {
    //     const ID = req.params.id;
    //     if (await redis.exists(`user_${ID}`)) {
    //         console.log("existss checkk", await redis.exists(`user_${ID}`));
    //         const result = await redis.hgetall(`user_${ID}`);
    //         rep(result).code(200);
    //     } else {
    //         setTimeout(async function run() {
    //             const where = {
    //                 id: ID,
    //             };
    //             const attributes = [
    //                 ["id", "ID"],
    //                 ["user_name", "Name"],
    //                 ["age", "Age"],
    //                 ["email", "Email"],
    //             ];
    // const result = await findOneUser(where, attributes);
    // console.log(result);
    // if (result) {
    //     await redis.hset(`user_${ID}`, result.dataValues);
    //     await redis.expire(`user_${ID}`, 10);
    //     rep(result).code(200);
    // } else rep("No User Found with the ID: " + req.params.id).code(404);
    //         }, 3000);
    //     }
    try {
        const { query: where } = req;
        const attributes = [];
        const result = await findOneUser(where, attributes);
        console.log(result);
        if (result) {
            rep(result).code(200);
        } else rep("No User Found" + JSON.stringify(where)).code(404);
    } catch (err) {
        rep("Error while fecthing the data").code(400);
    }
};

const createUser = async (req, rep) => {
    try {
        const inputData = req.payload;
        console.log(inputData);
        const password = await bcrypt.hash(inputData.password, 10);
        inputData.password = password;
        const result = await newUser(inputData);
        console.log(inputData);
        console.log(result);
        rep("User " + inputData.name + " Created").code(200);
    } catch (e) {
        console.log("Error : ", e);
        rep("Error!! Cannot create User " + e).code(500);
    }
};
const editUser = async (req, rep) => {
    try {
        const inputID = req.params.id;
        const inputData = req.payload;
        const password = await bcrypt.hash(inputData.password, 10);
        inputData.password = password;
        const result = await updateUser(inputID, inputData);
        console.log(inputData);
        console.log("Result " + result[0]);
        if (result[0]) rep("User with ID " + inputID + " Updated").code(200);
        else rep("No user found").code(404); // why
    } catch (e) {
        console.log("Error :::::: ", e);
        rep("Error!! Cannot update User " + e).code(500);
    }
};
const deleteUser = async (req, rep) => {
    try {
        const inputID = req.params.id;
        const result = await destroyUser(inputID);
        console.log(inputID, result);
        if (result) {
            rep("User Deleted!").code(200);
        } else rep("User not present").code(404);
    } catch (e) {
        console.log("Error :::::: ", e);
        rep("Error!! Cannot delete User " + e).code(500);
    }
};

const getAll = async (req, rep) => {
    try {
        const where = {
            id: [14, 13, 15],
        };
        const attributes = [
            ["id", "ID"],
            ["user_name", "Name"],
            ["age", "Age"],
            ["email", "Email"],
        ];
        const others = {
            order: [["id", "ASC"]],
            include: [
                {
                    model: ProductTable,
                    required: true,
                    attributes: [
                        ["productCode", "Product Code"],
                        ["productName", "Product Name"],
                    ],
                },
            ],
        };
        const result = await findAllUsers(where, attributes, others);
        result.forEach((element) => {
            console.log(element.toJSON());
        });
        rep(result);
    } catch (err) {
        console.log("\n\n*****************Error*************\n\n", err);
        rep("Error while fecthing the data").code(400);
    }
};

const getOne = async (req, rep) => {
    try {
        const where = {
            email: req.query.email,
        };
        const attributes = [
            ["id", "ID"],
            ["user_name", "Name"],
            ["age", "Age"],
            ["email", "Email"],
        ];
        const others = {
            include: [
                {
                    model: ProductTable,
                    required: true,
                    attributes: [
                        ["productCode", "Product Code"],
                        ["productName", "Product Name"],
                    ],
                },
            ],
        };
        const result = await findOneUser(where, attributes, others);
        console.log(result);
        if (result) rep(result).code(200);
        else rep("No User Found with the Mail ID: " + req.query.email).code(404);
    } catch (err) {
        console.log("\n\n*****************Error*************\n\n", err);
        rep("Error while fecthing the data").code(400);
    }
};

const getUserCount = async (req, rep) => {
    try {
        const where = req.params.id === undefined ? {} : { id: req.params.id };
        const attributes = [
            ["user_name", "Name"],
            ["age", "Age"],
            ["email", "Email"],
        ];
        const result = await findCount(where, attributes);

        console.log(result);
        if (result.length != 0) rep(result).code(200);
        else rep("No data Found with the ID: " + req.params.id).code(404);
    } catch (err) {
        console.log("\n\n*****************Error*************\n\n", err);
        rep("Error while fecthing the data").code(400);
    }
};

const answer = async (req, rep) => {
    try {
        const inputID = req.params.id;
        const inputData = req.payload;
        const where = {
            userTableId: inputID,
        };
        console.log(inputID);
        console.log(inputData);

        const result = await submitAnswer(where, inputData);

        console.log(result);

        if (result) rep(result).code(200);
        else rep("error###########").code(404);
    } catch (e) {
        console.log("Error : ", e);
        rep("Error while submitting the answer ").code(500);
    }
};

const getAnswers = async (req, rep) => {
    try {
        const result = await getSubmissions();
        if (result) rep(result.aggregations).code(200);
        else rep("Couldnt find data").code(404);
    } catch (err) {
        console.log("\n\n*****************Error*************\n\n", err);
        rep("Error while fecthing the data").code(400);
    }
};
const getAnswer = async (req, rep) => {
    try {
        const inputID = req.params.id;
        const result = await findSubmission({ userTableId: inputID });
        if (result) rep(result).code(200);
        else rep("Couldnt find data").code(404);

    } catch (e) {
        console.log("Error : ", e);
        rep("Error while fetching the answer ").code(500);
    }
}

const filterAnswers = async (req, rep) => {
    try {
        const result = await filterSubmissions(req.payload);
        console.log("Resultdata -----", result);
        if (result) rep(result).code(200);
        else rep("Couldnt find data").code(404);
    } catch (err) {
        console.log("\n\n*****************Error*************\n\n", err);
        rep("Error while fecthing the data").code(400);
    }
};

const login = async (req, rep) => {
    try {
        const result = await loginuser(req.payload);
        console.log("Resultdata -----", result);
        if (result) rep(result).code(200);
        else rep("Invalid Credentials").code(404);
    } catch (e) {
        console.log("Error : ", e);
        rep("Error while loggin in ").code(422);
    }
}

const invalid = async (req, rep) => {
    rep("OOPSs... you lost in a wrong endpoint!").code(400);
};

module.exports = {
    blank,
    allusers,
    getuser,
    editUser,
    createUser,
    deleteUser,
    getAll,
    getOne,
    getUserCount,
    answer,
    getAnswers,
    filterAnswers,
    login,
    getAnswer,
    invalid,
};


