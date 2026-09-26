const express = require("express");

const {
    authenticateToken
} = require("../middleware/auth.middleware");
const {
    authorizeRoles
} = require("../middleware/role.middleware");
const {
    getCourses,
    addCourse,
    editCourse,
    removeCourse
} = require("../controllers/course.controller");

const router = express.Router();
const adminOnly = [authenticateToken, authorizeRoles(1)];

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: Course list
 */
router.get("/", getCourses);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a course (Admin only)
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       201:
 *         description: Course created
 *       400:
 *         description: Invalid course data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       409:
 *         description: CourseCode already exists
 */
router.post("/", ...adminOnly, addCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course (Admin only)
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       200:
 *         description: Course updated
 *       400:
 *         description: Invalid course data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Course not found
 */
router.put("/:id", ...adminOnly, editCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course (Admin only)
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Course deleted
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Course not found
 */
router.delete("/:id", ...adminOnly, removeCourse);

module.exports = router;
