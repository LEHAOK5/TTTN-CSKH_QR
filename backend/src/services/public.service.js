const { pool } = require('../config/db.config');

const trackTicket = async (ticketCode) => {
    // Lấy thông tin cơ bản
    const result = await pool.query(`
        SELECT 
            p.id, p.ma_tra_cuu, p.trang_thai, p.tong_tien, p.han_bao_hanh, p.ngay_tao, p.ngay_cap_nhat,
            k.ho_ten, k.so_dien_thoai,
            t.ten_may, t.tinh_trang_may
        FROM phieu_sua_chua p
        JOIN thiet_bi t ON p.thiet_bi_id = t.id
        JOIN khach_hang k ON t.khach_hang_id = k.id
        WHERE p.ma_tra_cuu = $1
    `, [ticketCode]);

    if (result.rows.length === 0) return null;

    const ticket = result.rows[0];

    // Che giấu dữ liệu (Masking)
    const maskName = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        if (parts.length === 1) return name.substring(0, 1) + '***';
        return parts[0] + ' ' + parts.slice(1).map(p => p.substring(0, 1) + '***').join(' ');
    };
    
    const maskPhone = (phone) => {
        if (!phone || phone.length < 10) return phone;
        return phone.substring(0, 3) + '****' + phone.substring(phone.length - 3);
    };

    ticket.ho_ten = maskName(ticket.ho_ten);
    ticket.so_dien_thoai = maskPhone(ticket.so_dien_thoai);

    // Lấy lịch sử
    const historyResult = await pool.query(`
        SELECT trang_thai_moi, ghi_chu, ngay_tao
        FROM nhat_ky_sua_chua
        WHERE phieu_sua_chua_id = $1
        ORDER BY ngay_tao DESC
    `, [ticket.id]);

    ticket.nhat_ky = historyResult.rows;

    // Ẩn ID nội bộ
    delete ticket.id;

    return ticket;
};

const approveQuote = async (ticketCode, isApproved) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const result = await client.query('SELECT id, trang_thai FROM phieu_sua_chua WHERE ma_tra_cuu = $1', [ticketCode]);
        if (result.rows.length === 0) throw new Error('Không tìm thấy mã tra cứu');
        
        const ticket = result.rows[0];
        if (ticket.trang_thai !== 'CHỜ_KHÁCH_CHỐT_GIÁ') {
            throw new Error('Phiếu không ở trạng thái chờ báo giá!');
        }

        const newStatus = isApproved ? 'ĐANG_SỬA' : 'HỦY';
        const note = isApproved ? 'Khách hàng ĐÃ ĐỒNG Ý báo giá.' : 'Khách hàng TỪ CHỐI báo giá.';

        await client.query(`
            UPDATE phieu_sua_chua 
            SET trang_thai = $1, ngay_cap_nhat = CURRENT_TIMESTAMP
            WHERE id = $2
        `, [newStatus, ticket.id]);

        await client.query(`
            INSERT INTO nhat_ky_sua_chua (phieu_sua_chua_id, trang_thai_cu, trang_thai_moi, ghi_chu)
            VALUES ($1, $2, $3, $4)
        `, [ticket.id, ticket.trang_thai, newStatus, note]);

        await client.query('COMMIT');
        return { newStatus };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    trackTicket,
    approveQuote
};
