import db from '../db-config';

export const createTablePaket = () =>
  new Promise((resolve, reject) => {
    const sql =
      'CREATE TABLE IF NOT EXISTS paket(id INT AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(255), harga INT, make_up MEDIUMTEXT, gaun_wanita MEDIUMTEXT, kemeja_pria MEDIUMTEXT, dekor_kamar_pengantin MEDIUMTEXT, dekor_panggung MEDIUMTEXT, meja_kursi_akad MEDIUMTEXT, tenda_terima_tamu MEDIUMTEXT, meja_terima_tamu MEDIUMTEXT, gambar MEDIUMTEXT, created_at DATETIME)';
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else {
        console.log('Berhasil membuat tabel paket');
        resolve(results);
      }
    });
  });

export const createPaket = (data: {
  nama: string;
  harga: number;
  // status: number;
  make_up: string;
  gaun_wanita: string;
  kemeja_pria: string;
  dekor_kamar_pengantin: string;
  dekor_panggung: string;
  meja_kursi_akad: string;
  tenda_terima_tamu: number;
  meja_terima_tamu: string;
  gambar: string;
}) =>
  new Promise(async (resolve, reject) => {
    const sql = 'INSERT INTO paket SET ?';
    db.query(
      sql,
      {
        nama: data.nama,
        harga: data.harga,
        // status: data.status,
        make_up: data.make_up,
        gaun_wanita: data.gaun_wanita,
        kemeja_pria: data.kemeja_pria,
        dekor_kamar_pengantin: data.dekor_kamar_pengantin,
        dekor_panggung: data.dekor_panggung,
        meja_kursi_akad: data.meja_kursi_akad,
        tenda_terima_tamu: data.tenda_terima_tamu,
        meja_terima_tamu: data.meja_terima_tamu,
        gambar: data.gambar,
        created_at: new Date()
      },
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });

export const getListPaket = () =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM paket  ORDER BY id DESC`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const getDetailPaket = (id: number) =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM paket WHERE id = ${id}`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const deletePaketById = (id: number) =>
  new Promise((resolve, reject) => {
    db.query(`DELETE FROM paket WHERE id = ${id}`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const updatePaket = (data: {
  id: number;
  nama: string;
  harga: number;
  // status: number;
  make_up: string;
  gaun_wanita: string;
  kemeja_pria: string;
  dekor_kamar_pengantin: string;
  dekor_panggung: string;
  meja_kursi_akad: string;
  tenda_terima_tamu: string;
  meja_terima_tamu: string;
  gambar: string;
}) =>
  new Promise(async (resolve, reject) => {
    const dataUpdate = [
      data.nama,
      data.harga,
      // data.status,
      data.make_up,
      data.gaun_wanita,
      data.kemeja_pria,
      data.dekor_kamar_pengantin,
      data.dekor_panggung,
      data.meja_kursi_akad,
      data.tenda_terima_tamu,
      data.gambar,
      data.id,
    ];

    const sql = `UPDATE paket SET 
      nama = ?,
      harga = ?,
      make_up = ?,
      gaun_wanita = ?,
      kemeja_pria = ?,
      dekor_kamar_pengantin = ?,
      dekor_panggung = ?,
      meja_kursi_akad = ?,
      tenda_terima_tamu = ?,
      gambar = ?
      WHERE id = ?`;

    db.query(sql, dataUpdate, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
