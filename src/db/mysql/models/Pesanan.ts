import db from '../db-config';

export const createTablePesanan = () =>
  new Promise((resolve, reject) => {
    const sql =
      'CREATE TABLE IF NOT EXISTS pesanan(id INT AUTO_INCREMENT PRIMARY KEY, id_paket INT NOT NULL, id_user INT NOT NULL, harga INT, status VARCHAR(255), waktu_penggunaan DATETIME, waktu_pengembalian DATETIME, created_at DATETIME, nama VARCHAR(255), nomor_telepon VARCHAR(255), alamat MEDIUMTEXT)';
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else {
        console.log('Berhasil membuat tabel pesanan');
        resolve(results);
      }
    });
  });

export const createPesanan = (data: {
  id_paket: string;
  id_user: string;
  harga: string;
  waktu_penggunaan: string;
  waktu_pengembalian: string;
  created_at: any;
  nama: string;
  nomor_telepon: string;
  alamat: string;
  status: string;
}) =>
  new Promise(async (resolve, reject) => {
    const sql = 'INSERT INTO pesanan SET ?';
    db.query(
      sql,
      {
        id_paket: data.id_paket,
        id_user: data.id_user,
        harga: data.harga,
        waktu_penggunaan: data.waktu_penggunaan,
        waktu_pengembalian: data.waktu_pengembalian,
        created_at: data.created_at,
        nama: data.nama,
        nomor_telepon: data.nomor_telepon,
        alamat: data.alamat,
        status: data.status
      },
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });

export const updateStatusPesanan = (data: {
  id: number;
  status: string;
}) =>
  new Promise((resolve, reject) => {
    const sql = `UPDATE pesanan SET 
    status = ?
    WHERE id = ?`;
    db.query(sql, [data.status, data.id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const deletePesanan = (id: any) =>
  new Promise(async (resolve, reject) => {
    const sql = `DELETE FROM pesanan WHERE id = ${Number(id)}`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const getListPesanan = () =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT pkt.id as idPaket, psn.created_at as waktuPemesanan, pkt.nama as namaPaket, psn.id as idPesanan, psn.id_user as idUser, psn.harga as hargaPesanan, psn.status as statusPesanan, psn.waktu_penggunaan as waktuPenggunaan, psn.waktu_pengembalian as waktuPengembalian, psn.nama as namaPesanan, psn.alamat as alamatPesanan, psn.nomor_telepon as nomorTeleponPesanan FROM pesanan as psn
    INNER join paket as pkt
    on psn.id_paket = pkt.id
    ORDER BY psn.id DESC;
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const getListPesananByUser = (userId: number) =>
  new Promise(async (resolve, reject) => {
    const sql = `
    SELECT pkt.id as idPaket, psn.created_at as waktuPemesanan, pkt.nama as namaPaket, psn.id as idPesanan, psn.id_user as idUser, psn.harga as hargaPesanan, psn.status as statusPesanan, psn.waktu_penggunaan as waktuPenggunaan, psn.waktu_pengembalian as waktuPengembalian, psn.nama as namaPesanan, psn.alamat as alamatPesanan, psn.nomor_telepon as nomorTeleponPesanan FROM pesanan as psn
INNER join paket as pkt
on psn.id_paket = pkt.id
WHERE id_user = ${userId} ORDER BY psn.id DESC;
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const findPesananById = (id: number) =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT pkt.id as idPaket, psn.created_at as waktuPemesanan, pkt.nama as namaPaket, psn.id as idPesanan, psn.id_user as idUser, psn.harga as hargaPesanan, psn.status as statusPesanan, psn.waktu_penggunaan as waktuPenggunaan, psn.waktu_pengembalian as waktuPengembalian, psn.nama as namaPesanan, psn.alamat as alamatPesanan, psn.nomor_telepon as nomorTeleponPesanan FROM pesanan as psn
    INNER join paket as pkt
    on psn.id_paket = pkt.id
    WHERE psn.id = ${id}`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const checkAvailablePesanan = (id: number, waktuPenggunaan: string) =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM pesanan WHERE id = ${id} AND waktu_penggunaan <= "${waktuPenggunaan} 00:00:00" AND waktu_pengembalian >= "${waktuPenggunaan} 00:00:00" AND status = "Akan Digunakan"
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

