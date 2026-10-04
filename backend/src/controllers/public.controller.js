const publicService = require('../services/public.service');
const { getIo } = require('../config/socket.config');

const trackTicket = async (req, res, next) => {
    try {
        const { ticketCode } = req.params;
        const data = await publicService.trackTicket(ticketCode);
        
        if (!data) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy đơn sửa chữa!' });
        }

        res.status(200).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

const approveQuote = async (req, res, next) => {
    try {
        const { ticketCode } = req.params;
        const { isApproved } = req.body;
        
        if (typeof isApproved !== 'boolean') {
            return res.status(400).json({ success: false, message: 'Thiếu trạng thái đồng ý (true/false)!' });
        }

        const result = await publicService.approveQuote(ticketCode, isApproved);
        
        try {
            const io = getIo();
            io.to('receptionist_room').emit('quote_approved', {
                ticketCode,
                status: result.newStatus,
                message: isApproved ? 'Khách đã ĐỒNG Ý sửa' : 'Khách đã TỪ CHỐI sửa'
            });
        } catch (socketErr) {}

        res.status(200).json({ success: true, message: 'Cập nhật thành công', data: result });
    } catch (err) {
        if (err.message.includes('chờ báo giá')) {
            return res.status(400).json({ success: false, message: err.message });
        }
        next(err);
    }
};

module.exports = {
    trackTicket,
    approveQuote
};
