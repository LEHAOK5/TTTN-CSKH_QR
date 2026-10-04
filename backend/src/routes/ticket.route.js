const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');
const { check } = require('express-validator');
const rateLimit = require('express-rate-limit');

const submitLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 phút
    max: 10, // Tối đa 10 yêu cầu
    message: { success: false, message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 10 phút!' }
});

const validateSubmit = [
    check('fullName').isLength({ max: 100 }).withMessage('Tên không được vượt quá 100 ký tự'),
    check('phone').isLength({ max: 20 }).withMessage('Số điện thoại không hợp lệ'),
    check('issueDescription').isLength({ max: 1000 }).withMessage('Mô tả lỗi quá dài')
];

// Khách hàng quét mã QR Cố định và điền form (QR Intake)
router.post('/intake', submitLimiter, validateSubmit, ticketController.submitIntake);

module.exports = router;
