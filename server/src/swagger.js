const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Foosball API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: [`${__dirname}/routes/*.js`], // Path to the API docs
};

const specs = swaggerJsdoc(options);
console.log("specs", specs);
module.exports = { swaggerUi, specs };
