const Database = require("better-sqlite3");

const db = new Database("./database/database.sqlite");

db.exec(`
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role_id INTEGER NOT NULL
    );
`);

const insertRole = db.prepare(`
    INSERT OR IGNORE INTO roles (id, name)
    VALUES (?, ?)
`);

insertRole.run(1, "ADMIN");
insertRole.run(2, "USER");

console.log("Database connected");

module.exports = db;