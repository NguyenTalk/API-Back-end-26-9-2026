const express = require("express");

const {
    authenticateToken
} = require("../middleware/auth.middleware");

const {
    getProfile
} = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * /users/profile:
 *   get:
 *     operationId: getProfile
 *     summary: Get current user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Access token is required or invalid
 */
router.get(
    "/profile",
    authenticateToken,
    getProfile
);

module.exports = router;
