const Joi = require("joi");
const Handler = require("./controllers");

module.exports = [
    {
        method: "GET",
        path: "/hello",
        handler: (request, reply) => {
            reply("Hello, world!").code(200);
        },
    },
    {
        method: "GET",
        path: "/users",
        handler: Handler.user.allusers,
    },
    {
        method: "GET",
        path: "/products",
        handler: Handler.product.allproducts,
    },
    {
        method: "PUT",
        path: "/users/{id}",
        handler: Handler.user.editUser,
        config: {
            validate: {
                params: {
                    id: Joi.number().integer(),
                },
                payload: {
                    age: Joi.number().min(1).max(120),
                    name: Joi.string().min(2).max(15),
                    email: Joi.string().lowercase(), // Joi.string().email()
                    password: Joi.string().min(8).max(15),
                },
            },
        },
    },
    {
        method: "DELETE",
        path: "/users/{id}",
        handler: Handler.user.deleteUser,
        config: {
            validate: {
                params: {
                    id: Joi.number().integer(),
                },
            },
        },
    },
    {
        method: "POST",
        path: "/users/create",
        handler: Handler.user.createUser,
        config: {
            validate: {
                payload: {
                    age: Joi.number().min(1).max(120).required(),
                    name: Joi.string().min(2).max(15).required(),
                    email: Joi.string().lowercase().required(), // Joi.string().email()
                    password: Joi.string().min(8).max(15).required(),
                },
            },
        },
    },
    {
        method: "POST",
        path: "/user/login",
        handler: Handler.user.login,
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).max(15).required(),
                }
            }
        }
    },
    {
        method: "POST",
        path: "/users/{id}/answer",
        handler: Handler.user.answer,
        config: {
            validate: {
                params: {
                    id: Joi.number().integer(),
                },
                payload: {
                    answer: Joi.string().valid("A", "B", "C").uppercase().required(), //Joi.string().pattern(/^[a-z]+$/, )
                },
            },
        },
    },
    {
        method: "GET",
        path: "/user/{id}/answer",
        handler: Handler.user.getAnswer,
        config: {
            validate: {
                params: {
                    id: Joi.number().integer(),
                },
            },
        }
    },
    {
        method: "GET",
        path: "/submissions",
        handler: Handler.submission.findAllSubmissions,
    },
    {
        method: ["GET", "PUT", "POST", "DELETE"],
        path: "/{any*}",
        handler: Handler.user.invalid,
    },
];

    //   {
    //     method: "GET",
    //     path: "/users",
    //     handler: Handler.user.allusers,
    //   },
    //   {
    //     method: "GET",
    //     path: "/users/{id}",
    //     handler: Handler.user.getuser,
    //     config: {
    //       validate: {
    //         params: {
    //           id: Joi.number().integer(),
    //         },
    //       },
    //     },
    //   },
    //   {
    //     method: "POST",
    //     path: "/users/create",
    //     handler: Handler.user.createUser,
    //     config: {
    //       validate: {
    //         payload: {
    //           age: Joi.number().min(1).max(120).required(),
    //           name: Joi.string().min(2).max(15).required(),
    //           email: Joi.string().lowercase().required(), // Joi.string().email()
    //         },
    //       },
    //     },
    //   },
    //   {
    //     method: "PUT",
    //     path: "/users/edit/{id}",
    //     handler: Handler.user.editUser,
    //     config: {
    //       validate: {
    //         params: {
    //           id: Joi.number().integer(),
    //         },
    //         payload: {
    //           age: Joi.number().min(1).max(120),
    //           name: Joi.string().min(2).max(15),
    //           email: Joi.string().lowercase(), // Joi.string().email()
    //         },
    //       },
    //     },
    //   },
    //   {
    //     method: "DELETE",
    //     path: "/users/delete/{id}",
    //     handler: Handler.user.deleteUser,
    //     config: {
    //       validate: {
    //         params: {
    //           id: Joi.number().integer(),
    //         },
    //       },
    //     },
    //   },
    //   {
    //     method: ["GET", "PUT", "POST", "DELETE"],
    //     path: "/{any*}",
    //     handler: Handler.user.invalid,
    //   },

