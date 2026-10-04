const employeeService = require('../services/employee.service');
const { getIo } = require('../config/socket.config');

const getTickets = async (req, res, next) => {
    try {
        const tickets = await employeeService.getTickets();
        res.status(200).json({ success: true, data: tickets });
    } catch (err) {
        next(err);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const employeeId = req.user.AccountID;

        const result = await employeeService.updateStatus(id, status, employeeId);
        
        res.status(200).json({ success: true, message: 'Cập nhật thành công!' });
    } catch (err) {
        next(err);
    }
};

const sendQuote = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount, issue } = req.body;
        const employeeId = req.user.AccountID;

        await employeeService.sendQuote(id, amount, issue, employeeId);
        
        res.status(200).json({ success: true, message: 'Gửi báo giá thành công!' });
    } catch (err) {
        next(err);
    }
};

const uploadImages = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { imageUrls, imageType } = req.body; // imageType: 'TRUOC_KHI_SUA' hoặc 'SAU_KHI_SUA'

        if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
            return res.status(400).json({ success: false, message: 'Danh sách ảnh trống!' });
        }

        await employeeService.uploadImages(id, imageUrls, imageType);
        
        res.status(200).json({ success: true, message: 'Tải ảnh lên thành công!' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getTickets,
    updateStatus,
    sendQuote,
    uploadImages
};
