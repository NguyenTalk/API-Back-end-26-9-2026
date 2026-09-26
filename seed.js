const bcrypt = require("bcrypt");

const {
    createUser,
    findUserByUsername
} = require("./src/models/user.model");

async function createSeedUser(username, password, roleId) {
    const existingUser = findUserByUsername(username);

    if (existingUser) {
        console.log(`User '${username}' already exists; skipped`);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(username, hashedPassword, roleId);

    console.log(`User '${username}' created`);
}

async function seed() {
    // ADMIN
    await createSeedUser("admin", "123", 1);

    // STUDENT / USER
    await createSeedUser("student", "123", 2);
}

seed();