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

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     operationId: getAdminDashboard
 *     summary: Admin dashboard
 *     description: Endpoint accessible only by ADMIN users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome to admin dashboard
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
 *         description: Authentication required
 *       403:
 *         description: Access denied
 */
router.get(
    "/dashboard",
    authenticateToken,
    authorizeRoles(1),
    adminDashboard
);

module.exports = router;
