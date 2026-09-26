const db = require("../config/database");

function listCourses() {
    return db.prepare(`
        SELECT
            id,
            course_code AS CourseCode,
            course_name AS CourseName,
            credits AS Credits
        FROM courses
        ORDER BY id
    `).all();
}

function findCourseById(id) {
    return db.prepare(`
        SELECT
            id,
            course_code AS CourseCode,
            course_name AS CourseName,
            credits AS Credits
        FROM courses
        WHERE id = ?
    `).get(id);
}

function createCourse(courseCode, courseName, credits) {
    return db.prepare(`
        INSERT INTO courses (course_code, course_name, credits)
        VALUES (?, ?, ?)
    `).run(courseCode, courseName, credits);
}

function updateCourse(id, courseCode, courseName, credits) {
    return db.prepare(`
        UPDATE courses
        SET course_code = ?, course_name = ?, credits = ?
        WHERE id = ?
    `).run(courseCode, courseName, credits, id);
}

function deleteCourse(id) {
    return db.prepare("DELETE FROM courses WHERE id = ?").run(id);
}

module.exports = {
    listCourses,
    findCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
