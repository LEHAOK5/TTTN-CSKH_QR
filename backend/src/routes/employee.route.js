const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

router.use(verifyToken);
router.use(requireRole('RECEPTIONIST', 'KY_THUAT_VIEN', 'QUAN_LY', 'ADMIN')); // Cần map đúng Role

router.get('/tickets', employeeController.getTickets);
router.patch('/tickets/:id/status', employeeController.updateStatus);
router.post('/tickets/:id/quote', employeeController.sendQuote);
router.post('/tickets/:id/images', employeeController.uploadImages);

module.exports = router;
