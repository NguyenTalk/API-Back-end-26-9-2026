const express = require("express");

const {
    authenticateToken
} = require("../middleware/auth.middleware");

const {
    getProfile
} = require("../controllers/user.controller");

const router = express.Router();

router.get(
    "/profile",
    authenticateToken,
    getProfile
);

module.exports = router;