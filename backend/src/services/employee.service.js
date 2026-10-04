const { pool } = require('../config/db.config');

const getTickets = async () => {
    const result = await pool.query(`
        SELECT p.id, p.ma_tra_cuu, p.trang_thai, p.ngay_tao, k.ho_ten, k.so_dien_thoai, t.ten_may
        FROM phieu_sua_chua p
        JOIN thiet_bi t ON p.thiet_bi_id = t.id
        JOIN khach_hang k ON t.khach_hang_id = k.id
        ORDER BY p.ngay_tao DESC
    `);
    return result.rows;
};

const updateStatus = async (ticketId, newStatus, employeeId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const currentResult = await client.query('SELECT ma_tra_cuu, trang_thai FROM phieu_sua_chua WHERE id = $1', [ticketId]);
        if (currentResult.rows.length === 0) throw new Error('Không tìm thấy phiếu');
        
        const ticket = currentResult.rows[0];

        await client.query(`
            UPDATE phieu_sua_chua SET trang_thai = $1, ngay_cap_nhat = CURRENT_TIMESTAMP WHERE id = $2
        `, [newStatus, ticketId]);

        await client.query(`
            INSERT INTO nhat_ky_sua_chua (phieu_sua_chua_id, nhan_vien_id, trang_thai_cu, trang_thai_moi)
            VALUES ($1, $2, $3, $4)
        `, [ticketId, employeeId, ticket.trang_thai, newStatus]);

        await client.query('COMMIT');
        return { ticketCode: ticket.ma_tra_cuu };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const sendQuote = async (ticketId, amount, issue, employeeId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        await client.query(`
            UPDATE phieu_sua_chua 
            SET tong_tien = $1, trang_thai = 'CHỜ_KHÁCH_CHỐT_GIÁ', ngay_cap_nhat = CURRENT_TIMESTAMP 
            WHERE id = $2
        `, [amount, ticketId]);

        await client.query(`
            INSERT INTO nhat_ky_sua_chua (phieu_sua_chua_id, nhan_vien_id, trang_thai_moi, ghi_chu)
            VALUES ($1, $2, 'CHỜ_KHÁCH_CHỐT_GIÁ', $3)
        `, [ticketId, employeeId, `Gửi báo giá: ${amount} VNĐ. Lỗi: ${issue}`]);

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const uploadImages = async (ticketId, imageUrls, imageType) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        for (const url of imageUrls) {
            await client.query(`
                INSERT INTO hinh_anh_phieu (phieu_sua_chua_id, duong_dan_anh, loai_anh)
                VALUES ($1, $2, $3)
            `, [ticketId, url, imageType]);
        }

        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    getTickets,
    updateStatus,
    sendQuote,
    uploadImages
};
