const { pool } = require('../config/db.config');

const getDashboardStats = async () => {
    const revenueResult = await pool.query(`
        SELECT COALESCE(SUM(tong_tien), 0) as total_revenue
        FROM phieu_sua_chua
        WHERE trang_thai = 'ĐÃ_GIAO_KHÁCH_VÀ_THU_TIỀN'
    `);

    const ticketStats = await pool.query(`
        SELECT trang_thai, COUNT(*) as count
        FROM phieu_sua_chua
        GROUP BY trang_thai
    `);

    return {
        revenue: revenueResult.rows[0].total_revenue,
        tickets: ticketStats.rows
    };
};

const getEmployees = async () => {
    const result = await pool.query(`
        SELECT id, ten_dang_nhap, ho_ten, vai_tro, trang_thai, ngay_tao
        FROM nhan_vien
        ORDER BY ngay_tao DESC
    `);
    return result.rows;
};

module.exports = {
    getDashboardStats,
    getEmployees
};
