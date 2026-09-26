const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    findUserByUsername
} = require("../models/user.model");
async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = findUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const passwordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordValid) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const payload = {
    userId: user.id,
    roleId: user.role_id
};

const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRES_IN
    }
);

return res.status(200).json({
    token
});

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    login
};

