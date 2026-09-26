function adminDashboard(req, res) {
    return res.status(200).json({
        message: "Welcome to admin dashboard",
        user: req.user
    });
}

module.exports = {
    adminDashboard
};