const db = require("../config/database");
function findUserByUsername(username) {
    const stmt = db.prepare(`
        SELECT id, username, password, role_id
        FROM users
        WHERE username = ?
    `);

    return stmt.get(username);
}
function createUser(username, password, roleId) {
    const stmt = db.prepare(`
        INSERT INTO users (username, password, role_id)
        VALUES (?, ?, ?)
    `);

    return stmt.run(username, password, roleId);
}
module.exports = {
    findUserByUsername,
    createUser
};