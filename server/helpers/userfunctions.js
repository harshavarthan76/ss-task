const bcrypt = require("bcrypt");
const UserTable = require("../database/models/user");

const ProductTable = require("../database/models/product");
const {
  findSubmission,
  createSubmission,
  updateSubmission,
} = require("./submissionfunctions");

async function findAllUsers(where, attributes, others) {
  return await UserTable.findAll({
    where,
    attributes: attributes.length == 0 ? null : attributes,
    ...others,
  });
}

async function findOneUser(where, attributes = [], others = {}) {
  return await UserTable.findOne({
    where,
    attributes: attributes.length == 0 ? null : attributes,
  });
}
async function newUser(data) {
  return await UserTable.create(data);
}
async function updateUser(id, data) {
  return await UserTable.update(data, {
    where: {
      id: id,
    },
  });
}

async function destroyUser(id) {
  return await UserTable.destroy({
    where: {
      id: id,
    },
  });
}

async function findCount(where, attributes) {
  return await UserTable.count({
    where,
    attributes: attributes.length == 0 ? null : attributes,
    include: [
      {
        model: ProductTable,
        required: true,
      },
    ],
    group: ["usertable.id"],
  });
}

async function submitAnswer(where, data) {
  const check = await findSubmission(where);
  console.log("check -----------" + check);
  if (check) {
    console.log(check.toJSON());
    return await updateSubmission(where, data);
  } else {
    return await createSubmission(where, data);
  }
}

async function loginuser(payload) {
  console.log("🚀 ~ file: userfunctions.js:70 ~ loginuser ~ payload:", payload)

  const user = await findOneUser({ email: payload.email })
  if (!user) {
    return null;
  }
  console.log("🚀 ~ file: userfunctions.js:71 ~ loginuser ~ user:", user)

  const isMatch = await bcrypt.compare(payload.password, user.password);
  console.log("🚀 ~ file: userfunctions.js:77 ~ loginuser ~ isMatch:", isMatch)

  if (!isMatch) return null;
  return user;
}

module.exports = {
  findAllUsers,
  findOneUser,
  newUser,
  updateUser,
  destroyUser,
  findCount,
  submitAnswer,
  loginuser,
};

// async function run() {
//   const result = await client.search({
//     index: "favorite_candy",
//     body: {
//       query: {
//         match_all: {},
//       },
//     },
//   });
//   console.log(result.hits.hits);
// }
// run().catch(console.log);
