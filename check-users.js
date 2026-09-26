const db = require("./src/config/database");

const users = db.prepare(`
    SELECT id, username, role_id
    FROM users
    ORDER BY id
`).all();

console.table(users);