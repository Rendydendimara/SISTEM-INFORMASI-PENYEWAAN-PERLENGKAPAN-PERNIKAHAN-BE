import mysql from 'mysql2';

const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'si_penyewaan_pernikahan',
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  // timeout: 60 * 60 * 1000,
});

export default db;
