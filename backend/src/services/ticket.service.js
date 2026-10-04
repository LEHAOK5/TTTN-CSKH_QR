const { pool } = require('../config/db.config');
const { getIo } = require('../config/socket.config');

const submitIntake = async (customerData) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        const { fullName, phone, zaloId, issueDescription, deviceName, serialImei } = customerData;
        let customerId = null;
        let deviceId = null;

        // 1. Tìm hoặc tạo Khách hàng
        const userResult = await client.query(`SELECT id FROM khach_hang WHERE so_dien_thoai = $1`, [phone]);
            
        if (userResult.rows.length > 0) {
            customerId = userResult.rows[0].id;
        } else {
            const newUser = await client.query(`
                INSERT INTO khach_hang (ho_ten, so_dien_thoai, zalo_id)
                VALUES ($1, $2, $3)
                RETURNING id
            `, [fullName, phone, zaloId || null]);
            customerId = newUser.rows[0].id;
        }
        
        // 2. Tạo Thiết bị mới cho khách hàng này
        const newDevice = await client.query(`
            INSERT INTO thiet_bi (khach_hang_id, ten_may, so_imei_serial, tinh_trang_may)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `, [customerId, deviceName, serialImei || null, issueDescription]);
        deviceId = newDevice.rows[0].id;

        // 3. Tạo Phiếu sửa chữa
        // Tạo mã ngẫu nhiên dạng RP-XXXXXX
        const ticketCode = 'RP-' + Math.floor(100000 + Math.random() * 900000);
        
        const newTicket = await client.query(`
            INSERT INTO phieu_sua_chua (thiet_bi_id, ma_tra_cuu, trang_thai)
            VALUES ($1, $2, 'CHỜ_KHÁM')
            RETURNING id, ma_tra_cuu, trang_thai, ngay_tao
        `, [deviceId, ticketCode]);

        const ticket = newTicket.rows[0];

        // 4. Lưu nhật ký sửa chữa
        await client.query(`
            INSERT INTO nhat_ky_sua_chua (phieu_sua_chua_id, trang_thai_moi, ghi_chu)
            VALUES ($1, 'CHỜ_KHÁM', 'Khách hàng vừa tạo yêu cầu tiếp nhận qua mã QR')
        `, [ticket.id]);

        await client.query('COMMIT');

        // 5. Bắn thông báo Socket.io cho Lễ tân
        try {
            const io = getIo();
            io.to('receptionist_room').emit('new_ticket', {
                ticketCode: ticket.ma_tra_cuu,
                customerName: fullName,
                deviceName: deviceName,
                issue: issueDescription,
                createdAt: ticket.ngay_tao
            });
            console.log(`📡 Đã gửi thông báo Realtime cho Lễ tân về đơn ${ticket.ma_tra_cuu}`);
        } catch (socketErr) {
            console.error('Lỗi khi gửi socket event:', socketErr.message);
        }

        return { ticketCode: ticket.ma_tra_cuu };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    submitIntake
};
