const ProductTable = require("../database/models/product");
const UserTable = require("../database/models/user");

async function findAllProducts(where, attributes, others) {
  return await ProductTable.findAll({
    where,
    attributes: attributes.length === 0 ? null : attributes,
    ...others,
  });
}

async function findOneProduct(where, attributes) {
  return await ProductTable.findOne({
    where,
    attributes: attributes.length === 0 ? null : attributes,
  });
}

async function newProduct(data) {
  return await ProductTable.create(data);
}
async function updateProduct(id, data) {
  return await ProductTable.update(data, {
    where: {
      id: id,
    },
  });
}
async function destroyProduct(id) {
  return await ProductTable.destroy({
    where: {
      id: id,
    },
  });
}

async function findCount(where, attributes) {
  return await ProductTable.count({
    where,
    attributes: attributes.length == 0 ? null : attributes,
    include: [
      {
        model: UserTable,
        required: true,
      },
    ],
    group: ["producttable.id"],
  });
}

module.exports = {
  findAllProducts,
  findOneProduct,
  newProduct,
  updateProduct,
  destroyProduct,
  findCount,
};
