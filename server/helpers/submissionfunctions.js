const UserTable = require("../database/models/user");
const SubmissionTable = require("../database/models/submission");
const client = require("../database/elastic");

async function findSubmission(where) {
  return await SubmissionTable.findOne({
    where,
    include: [
      {
        model: UserTable,
        required: true,
      },
    ],
  });
}
async function findAllSubmissions({ where = {}, options = {} }) {
  return await SubmissionTable.findAll({
    where,
    ...options,
  });
}
async function deleteSubmission(where) {
  return await SubmissionTable.destroy({
    where,
    individualHooks: true,
  });
}

async function updateSubmission(where, data) {
  return await SubmissionTable.update(
    {
      answer: data.answer,
    },
    {
      where,
      individualHooks: true,
    }
  );
}

async function createSubmission(where, data) {
  return await SubmissionTable.create({
    userTableId: where.userTableId,
    answer: data.answer,
  });
}

async function getSubmissions() {
  return await client.search({
    size: 0,
    index: "v3_users",
    type: "_doc",
    body: {
      aggregations: {
        answers: {
          terms: { field: "answer.keyword" },
        },
      },
    },
  });
}

async function filterSubmissions(payload) {
  console.log("Payload-------", payload);
  // const datafield = `userinfo.${payload.type}`;
  // console.log(datafield);
  switch (payload.op) {
    case "contains":
      return await client.search({
        index: "v3_users",
        type: "_doc",
        body: {
          query: {
            query_string: {
              default_field: `userinfo.${payload.type}`,
              query: `*${payload.value}*`,
            },
          },
          aggregations: {
            answers: {
              terms: {
                field: "answer.keyword",
              },
            },
          },
        },
      });
    case "is":
      return await client.search({
        index: "v3_users",
        type: "_doc",
        body: {
          query: {
            match:
              payload.type === "email"
                ? {
                  "userinfo.email": payload.value,
                }
                : {
                  "userinfo.name": payload.value,
                },
          },
        },
      });
    case "not":
      return await client.search({
        index: "v3_users",
        type: "_doc",
        body: {
          query: {
            bool: {
              must_not: [
                {
                  match:
                    payload.type === "email"
                      ? {
                        "userinfo.email": payload.value,
                      }
                      : {
                        "userinfo.name": payload.value,
                      },
                },
              ],
            },
          },
          aggregations: {
            answers: {
              terms: {
                field: "answer.keyword",
              },
            },
          },
        },
      });
  }
}

module.exports = {
  findSubmission,
  findAllSubmissions,
  deleteSubmission,
  createSubmission,
  updateSubmission,
  getSubmissions,
  filterSubmissions,
};
// async function submitAnswer(where, data) {
//     const check = await findSubmission(where);
//     console.log("check -----------" + check);

//     if (check) {
//       console.log(check.toJSON());
//       return await SubmissionTable.update(
//         {
//           answer: data.answer,
//         },
//         {
//           where,
//           individualHooks: true,
//         }
//       );
//     } else {
//       return await SubmissionTable.create({
//         usertableId: where.usertableId,
//         answer: data.answer,
//         include: [
//           {
//             model: UserTable,
//             required: true,
//           },
//         ],
//       });
//     }
// }

// query: {
//   bool: {
//     should: [
//       {
//         match: {
//           "userinfo.email": payload.value,
//         },
//         match: {
//           "userinfo.name": payload.value,
//         },
//       },
//     ],
//   },
// },
