const express = require("express");

const {
    authenticateToken
} = require("../middleware/auth.middleware");

const {
    authorizeRoles
} = require("../middleware/role.middleware");

const {
    adminDashboard
} = require("../controllers/admin.controller");

const router = express.Router();

router.get(
    "/dashboard",
    authenticateToken,
    authorizeRoles(1),
    adminDashboard
);

module.exports = router;