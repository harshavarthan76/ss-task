const {
    findAllProducts,
    findOneProduct,
    newProduct,
    updateProduct,
    destroyProduct,
    findCount,
} = require("../helpers/productfunctions");

const allproducts = async (req, rep) => {
    try {
        const where = {};
        const attributes = [];
        const others = {};
        const result = await findAllProducts(where, attributes, others);
        result.forEach((element) => {
            console.log(element.toJSON());
        });
        rep(result);
    } catch (err) {
        console.log("\n\n*****************Error*************\n\n", err);
        rep("Error while fecthing the data").code(400);
    }
};

const getproduct = async (req, rep) => {
    try {
        const where = {
            id: req.params.id,
        };
        const attributes = [];
        const result = await findOneProduct(where, attributes);
        console.log(result);
        if (result) rep(result).code(200);
        else rep("No Product Found with the ID: " + req.params.id).code(404);
    } catch (err) {
        rep("Error while fecthing the data").code(400);
    }
};

const createProduct = async (req, rep) => {
    try {
        const inputData = req.payload;
        const result = await newProduct(inputData);
        console.log(inputData);
        console.log(result);
        rep("Product " + inputData.productName + " Created").code(200);
    } catch (e) {
        console.log("Error : ", e);
        rep("Error!! Cannot create Product " + e).code(500);
    }
};
const editProduct = async (req, rep) => {
    try {
        const inputID = req.params.id;
        const inputData = req.payload;
        const result = await updateProduct(inputID, inputData);
        console.log(inputData);
        console.log("Result " + result[0]);
        if (result[0]) rep("Product  Updated").code(200);
        else rep("No product found").code(404); // why
    } catch (e) {
        console.log("Error :::::: ", e);
        rep("Error!! Cannot update Product " + e).code(500);
    }
};
const deleteProduct = async (req, rep) => {
    try {
        const inputID = req.params.id;
        const result = await destroyProduct(inputID);
        console.log(inputID, result);
        if (result) rep("Product Deleted!").code(200);
        else rep("Product not present").code(404);
    } catch (e) {
        console.log("Error :::::: ", e);
        rep("Error!! Cannot delete Product " + e).code(500);
    }
};
const getProductCount = async (req, rep) => {
    try {
        const where = req.params.id === undefined ? {} : { id: req.params.id };
        const attributes = [
            ["productName", "Product Name"],
            ["productCode", "Product Code"],
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

module.exports = {
    allproducts,
    getproduct,
    createProduct,
    editProduct,
    deleteProduct,
    getProductCount,
};
