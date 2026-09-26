const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

test("login API contains the required JWT flow", () => {
    const controller = read("src/controllers/auth.controller.js");
    const route = read("src/routes/auth.routes.js");

    assert.match(route, /router\.post\(["']\/login["']/);
    assert.match(controller, /findUserByUsername/);
    assert.match(controller, /bcrypt\.compare/);
    assert.match(controller, /jwt\.sign/);
    assert.match(controller, /userId/);
    assert.match(controller, /roleId/);
});

test("protected routes use authentication and role middleware", () => {
    const authMiddleware = read("src/middleware/auth.middleware.js");
    const userRoutes = read("src/routes/user.routes.js");
    const adminRoutes = read("src/routes/admin.routes.js");

    assert.match(authMiddleware, /jwt\.verify/);
    assert.match(userRoutes, /authenticateToken/);
    assert.match(adminRoutes, /authenticateToken/);
    assert.match(adminRoutes, /authorizeRoles\(1\)/);
    assert.equal((userRoutes.match(/router\.get\(/g) || []).length, 1);
    assert.equal((adminRoutes.match(/router\.get\(/g) || []).length, 1);
});

test("Swagger documents login input/output and JWT security", () => {
    const authRoutes = read("src/routes/auth.routes.js");
    const swagger = read("src/swagger.js");

    assert.match(authRoutes, /@swagger/);
    assert.match(authRoutes, /requestBody:/);
    assert.match(authRoutes, /required:\s*\n\s*\*\s*\- token/);
    assert.match(swagger, /bearerAuth/);
});
