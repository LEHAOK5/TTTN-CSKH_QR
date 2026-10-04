const { Client } = require('pg');

const connectionString = 'postgresql://postgres.apcpimhqbgahhcemsicj:lenhuthao2005tg@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

const sql = `
-- Xóa các bảng cũ (Cả bảng tiếng Anh lẫn tiếng Việt nếu có) để làm mới hoàn toàn
DROP TABLE IF EXISTS hinh_anh_phieu CASCADE;
DROP TABLE IF EXISTS nhat_ky_sua_chua CASCADE;
DROP TABLE IF EXISTS phieu_sua_chua CASCADE;
DROP TABLE IF EXISTS thiet_bi CASCADE;
DROP TABLE IF EXISTS khach_hang CASCADE;
DROP TABLE IF EXISTS nhan_vien CASCADE;

-- Dọn dẹp cả các bảng tiếng Anh cũ mà tôi vừa tạo lúc nãy
DROP TABLE IF EXISTS ticket_images CASCADE;
DROP TABLE IF EXISTS ticket_histories CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS devices CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS ticket_sessions CASCADE;

-- 1. Bảng nhan_vien (Tài khoản nhân viên)
CREATE TABLE nhan_vien (
    id SERIAL PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    vai_tro VARCHAR(50) NOT NULL CHECK (vai_tro IN ('QUAN_LY', 'LE_TAN', 'KY_THUAT_VIEN')),
    mat_khau VARCHAR(255) NOT NULL,
    trang_thai VARCHAR(20) DEFAULT 'HOAT_DONG' CHECK (trang_thai IN ('HOAT_DONG', 'KHOA')),
    ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng khach_hang (Thông tin Khách hàng)
CREATE TABLE khach_hang (
    id SERIAL PRIMARY KEY,
    so_dien_thoai VARCHAR(20) UNIQUE NOT NULL,
    ho_ten VARCHAR(100) NOT NULL,
    zalo_id VARCHAR(100),
    diem_thuong INTEGER DEFAULT 0,
    ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng thiet_bi (Thông tin Thiết bị của khách)
CREATE TABLE thiet_bi (
    id SERIAL PRIMARY KEY,
    khach_hang_id INTEGER NOT NULL REFERENCES khach_hang(id) ON DELETE CASCADE,
    ten_may VARCHAR(255) NOT NULL,
    so_imei_serial VARCHAR(100),
    tinh_trang_may TEXT,
    ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Bảng phieu_sua_chua (Phiếu sửa chữa / Đơn hàng)
CREATE TABLE phieu_sua_chua (
    id SERIAL PRIMARY KEY,
    thiet_bi_id INTEGER NOT NULL REFERENCES thiet_bi(id) ON DELETE CASCADE,
    ma_tra_cuu VARCHAR(50) UNIQUE NOT NULL,
    trang_thai VARCHAR(50) DEFAULT 'CHỜ_KHÁM' CHECK (trang_thai IN ('CHỜ_KHÁM', 'ĐANG_CHUẨN_ĐOÁN', 'CHỜ_KHÁCH_CHỐT_GIÁ', 'ĐANG_SỬA', 'CHỜ_LINH_KIỆN', 'ĐÃ_SỬA_XONG', 'ĐÃ_GIAO_KHÁCH_VÀ_THU_TIỀN', 'HỦY')),
    tong_tien DECIMAL(15,2) DEFAULT 0,
    han_bao_hanh TIMESTAMP WITH TIME ZONE,
    ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bảng nhat_ky_sua_chua (Nhật ký sửa chữa)
CREATE TABLE nhat_ky_sua_chua (
    id SERIAL PRIMARY KEY,
    phieu_sua_chua_id INTEGER NOT NULL REFERENCES phieu_sua_chua(id) ON DELETE CASCADE,
    nhan_vien_id INTEGER REFERENCES nhan_vien(id) ON DELETE SET NULL, -- Ai làm (null nếu là thao tác hệ thống/khách hàng)
    trang_thai_cu VARCHAR(50),
    trang_thai_moi VARCHAR(50) NOT NULL,
    ghi_chu TEXT,
    ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bảng hinh_anh_phieu (Hình ảnh đính kèm phiếu)
CREATE TABLE hinh_anh_phieu (
    id SERIAL PRIMARY KEY,
    phieu_sua_chua_id INTEGER NOT NULL REFERENCES phieu_sua_chua(id) ON DELETE CASCADE,
    duong_dan_anh TEXT NOT NULL,
    loai_anh VARCHAR(20) CHECK (loai_anh IN ('TRUOC_KHI_SUA', 'SAU_KHI_SUA')),
    ngay_tao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

async function runMigration() {
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Đã kết nối DB, bắt đầu dọn dẹp bảng cũ và tạo bảng TIẾNG VIỆT...');
    
    await client.query(sql);
    console.log('✅ Đã tạo mới thành công các bảng bằng Tiếng Việt!');
    
    // Check tables again
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log('📋 Danh sách bảng hiện tại trên Supabase:', tables.rows.map(t => t.table_name).join(', '));

  } catch (error) {
    console.error('❌ LỖI:', error.message);
  } finally {
    await client.end();
  }
}

runMigration();
