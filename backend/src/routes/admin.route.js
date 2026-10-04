const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

router.use(verifyToken);
router.use(requireRole('QUAN_LY', 'ADMIN')); // Chỉ dành cho Quản lý

router.get('/dashboard', adminController.getDashboard);
router.get('/employees', adminController.getEmployees);

module.exports = router;
