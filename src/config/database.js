const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../../database/database.sqlite");
const db = new Database(dbPath);

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

    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_code TEXT UNIQUE NOT NULL,
        course_name TEXT NOT NULL,
        credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 10)
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
