const ticketService = require('../services/ticket.service');
const { validationResult } = require('express-validator');

// Khách hàng điền Form (QR Intake) và Bấm gửi
const submitIntake = async (req, res, next) => {
    try {
        // Kiểm tra lỗi Validation trước
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                errorCode: "VALIDATION_ERROR",
                message: "Dữ liệu nhập không hợp lệ!",
                errors: errors.array()
            });
        }

        const { fullName, phone, zaloId, issueDescription, deviceName, serialImei } = req.body;
        
        if (!fullName || !phone || !issueDescription || !deviceName) {
            return res.status(400).json({ 
                success: false, 
                errorCode: "VALIDATION_ERROR",
                message: "Vui lòng nhập đầy đủ Tên, Số điện thoại, Tên máy và Mô tả lỗi!" 
            });
        }

        const result = await ticketService.submitIntake(req.body);
        
        res.status(201).json({
            success: true,
            message: "Gửi yêu cầu tiếp nhận sửa chữa thành công!",
            data: {
                ticketCode: result.ticketCode,
                status: "CHỜ_KHÁM",
                submittedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitIntake
};
