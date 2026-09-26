const bcrypt = require("bcrypt");

const { createUser } = require("./src/models/user.model");

async function seed() {
    const username = "admin";
    const password = "123";
    const roleId = 1;

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(username, hashedPassword, roleId);

    console.log("Admin user created");
}

seed();