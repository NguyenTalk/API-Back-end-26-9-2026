const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "JWT Login API",
            version: "1.0.0",
            description: "API authentication and authorization using JWT"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        components: {
            schemas: {
                CourseInput: {
                    type: "object",
                    required: ["CourseCode", "CourseName", "Credits"],
                    properties: {
                        CourseCode: { type: "string", example: "WEB101" },
                        CourseName: { type: "string", example: "Web Programming" },
                        Credits: { type: "integer", minimum: 1, maximum: 10, example: 3 }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        path.join(__dirname, "routes", "auth.routes.js"),
        path.join(__dirname, "routes", "user.routes.js"),
        path.join(__dirname, "routes", "admin.routes.js"),
        path.join(__dirname, "routes", "course.routes.js")
    ]
};

const swaggerSpec = swaggerJSDoc(options);

console.log(
    "Swagger paths:",
    Object.keys(swaggerSpec.paths || {})
);

module.exports = swaggerSpec;
