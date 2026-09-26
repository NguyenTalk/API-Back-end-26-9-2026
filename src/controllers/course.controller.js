const {
    listCourses,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../models/course.model");

function parseCourseBody(body) {
    const { CourseCode, CourseName, Credits } = body || {};
    const normalizedCode = typeof CourseCode === "string" ? CourseCode.trim() : "";
    const normalizedName = typeof CourseName === "string" ? CourseName.trim() : "";
    const numericCredits = typeof Credits === "number" ? Credits : Number(Credits);

    if (!normalizedCode || !normalizedName || !Number.isInteger(numericCredits) || numericCredits < 1 || numericCredits > 10) {
        return null;
    }

    return {
        CourseCode: normalizedCode,
        CourseName: normalizedName,
        Credits: numericCredits
    };
}

function isValidId(value) {
    return /^\d+$/.test(String(value)) && Number(value) > 0;
}

function getCourses(req, res) {
    return res.status(200).json(listCourses());
}

function addCourse(req, res) {
    const course = parseCourseBody(req.body);

    if (!course) {
        return res.status(400).json({
            message: "CourseCode, CourseName are required and Credits must be an integer from 1 to 10"
        });
    }

    try {
        const result = createCourse(course.CourseCode, course.CourseName, course.Credits);
        return res.status(201).json({
            id: result.lastInsertRowid,
            ...course
        });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({ message: "CourseCode already exists" });
        }
        throw error;
    }
}

function editCourse(req, res) {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "Course id must be a positive integer" });
    }

    const course = parseCourseBody(req.body);
    if (!course) {
        return res.status(400).json({
            message: "CourseCode, CourseName are required and Credits must be an integer from 1 to 10"
        });
    }

    const id = Number(req.params.id);
    if (!findCourseById(id)) {
        return res.status(404).json({ message: "Course not found" });
    }

    try {
        updateCourse(id, course.CourseCode, course.CourseName, course.Credits);
        return res.status(200).json({ id, ...course });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({ message: "CourseCode already exists" });
        }
        throw error;
    }
}

function removeCourse(req, res) {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "Course id must be a positive integer" });
    }

    const result = deleteCourse(Number(req.params.id));
    if (result.changes === 0) {
        return res.status(404).json({ message: "Course not found" });
    }

    return res.status(204).send();
}

module.exports = {
    getCourses,
    addCourse,
    editCourse,
    removeCourse
};
