const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});
require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const express = require("express");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const courseRoutes = require("./routes/course.routes");

const app = express();

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "JWT Login API is running"
    });
});

module.exports = app;
