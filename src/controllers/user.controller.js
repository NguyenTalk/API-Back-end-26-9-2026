function getProfile(req, res) {
    return res.status(200).json({
        message: "Authenticated successfully",
        user: req.user
    });
}

module.exports = {
    getProfile
};