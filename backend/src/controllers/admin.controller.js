const adminService = require('../services/admin.service');

const getDashboard = async (req, res, next) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.status(200).json({ success: true, data: stats });
    } catch (err) {
        next(err);
    }
};

const getEmployees = async (req, res, next) => {
    try {
        const employees = await adminService.getEmployees();
        res.status(200).json({ success: true, data: employees });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getDashboard,
    getEmployees
};
