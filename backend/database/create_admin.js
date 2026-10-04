const { Client } = require('pg');
const bcrypt = require('bcrypt');
const connectionString = 'postgresql://postgres.apcpimhqbgahhcemsicj:lenhuthao2005tg@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const hash = await bcrypt.hash('123456', 10);
    await client.query(`
        INSERT INTO nhan_vien (ten_dang_nhap, ho_ten, vai_tro, mat_khau, trang_thai)
        VALUES ('admin', 'Quản Lý Cửa Hàng', 'QUAN_LY', $1, 'HOAT_DONG')
        ON CONFLICT (ten_dang_nhap) DO NOTHING;
    `, [hash]);
    console.log("Đã tạo tài khoản quản lý admin/123456");
  } catch (e) {
    console.error(e.message);
  } finally {
    await client.end();
  }
}
run();
