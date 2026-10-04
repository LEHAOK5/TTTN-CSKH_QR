const { Client } = require('pg');
const connectionString = 'postgresql://postgres.apcpimhqbgahhcemsicj:lenhuthao2005tg@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

async function run() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query(`ALTER TABLE nhan_vien ADD COLUMN ten_dang_nhap VARCHAR(50) UNIQUE;`);
    console.log("Added ten_dang_nhap");
  } catch (e) {
    console.error(e.message);
  } finally {
    await client.end();
  }
}
run();
