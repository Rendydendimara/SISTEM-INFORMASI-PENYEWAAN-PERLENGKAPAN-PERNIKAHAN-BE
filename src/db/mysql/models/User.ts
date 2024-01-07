import { hashingPassword } from '../../../utils/password';
import db from '../db-config';

export const createTableUser = () =>
  new Promise((resolve, reject) => {
    const sql =
      'CREATE TABLE IF NOT EXISTS user(id INT AUTO_INCREMENT PRIMARY KEY, username varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL, hak_akses varchar(255) NOT NULL, alamat MEDIUMTEXT, nomor_telepon varchar(255), token MEDIUMTEXT)';
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else {
        console.log('Berhasil membuat tabel user');
        resolve(results);
      }
    });
  });

export const getUserByToken = (token: string) =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM user WHERE token = "${token}"`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const findUserByUsername = (username: string) =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM user WHERE username = "${username}"`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const findUserByEmail = (email: string) =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM user WHERE email = "${email}"`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const updateTokenUser = (data: { id: number; token: string }) =>
  new Promise((resolve, reject) => {
    const sql = `UPDATE user SET token = ? WHERE id = ?`;
    db.query(sql, [data.token, data.id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const createUser = (data: {
  username: string;
  password: string;
  alamat: string;
  hakAkses: string;
  nomor_telepon: string;
  token: string;
  email: string;
}) =>
  new Promise(async (resolve, reject) => {
    const passwordHashed = await hashingPassword(data.password);
    const sql = 'INSERT INTO user SET ?';
    db.query(
      sql,
      {
        username: data.username,
        password: passwordHashed,
        alamat: data.alamat,
        hak_akses: data.hakAkses,
        nomor_telepon: data.nomor_telepon,
        token: data.token,
        email: data.email,
      },
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });

// export const getListUser = () =>
//   new Promise(async (resolve, reject) => {
//     const sql = `SELECT *
//     FROM user
//     INNER JOIN jabatan ON user.departemen=jabatan.id_jabatan ORDER BY id DESC;`;
//     db.query(sql, (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });

export const findUserById = (id: number) =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT * FROM user WHERE id = ${id}`;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const deleteUserById = (id: number) =>
  new Promise((resolve, reject) => {
    db.query(`DELETE FROM user WHERE id = ${id}`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

export const findAllUserNotAdmin = () =>
  new Promise(async (resolve, reject) => {
    const sql = `SELECT usr.id, usr.username, usr.alamat, usr.nomor_telepon, usr.email 
    FROM user as usr
    WHERE usr.hak_akses = 'user' 
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// export const updatePasswordUser = (data: { id: number; password: string }) =>
//   new Promise(async (resolve, reject) => {
//     const passwordHashed = await hashingPassword(data.password);
//     const dataUpdate = [passwordHashed, data.id];
//     const sql = `UPDATE user SET
//     password = ?
//     WHERE id = ?`;
//     db.query(sql, dataUpdate, (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });

export const updateUser = (data: {
  id: number;
  username: string;
  alamat: string;
  nomor_telepon: string;
}) =>
  new Promise(async (resolve, reject) => {
    const dataUpdate = [
      data.username,
      data.nomor_telepon,
      data.alamat,
      data.id,
    ];
    const sql = `UPDATE user SET 
      username = ?, 
      nomor_telepon = ?,
      alamat = ?
      WHERE id = ?`;
    db.query(sql, dataUpdate, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// export const updateUserWithPassword = (data: {
//   id: number;
//   username: string;
//   password: string;
//   nama: string;
//   nip: string;
//   unitId: any;
// }) =>
//   new Promise(async (resolve, reject) => {
//     const passwordHashed = await hashingPassword(data.password);

//     const sql = `UPDATE user SET 
//     username = ?, 
//     password = ?,
//     nama = ?,
//     nip = ?,
//     unit_id = ?
//     WHERE id = ?`;
//     db.query(
//       sql,
//       [
//         data.username,
//         passwordHashed,
//         data.nama,
//         data.nip,
//         Number(data.unitId),
//         Number(data.id),
//       ],
//       (err, results) => {
//         if (err) reject(err);
//         else resolve(results);
//       }
//     );
//   });

// export const updateUserWithoutPassword = (data: {
//   id: number;
//   username: string;
//   nomor_telepon: string;
//   alamat: string;
// }) =>
//   new Promise(async (resolve, reject) => {
//     const sql = `UPDATE user SET 
//     username = ?, 
//     nomor_telepon = ?,
//     alamat = ?
//     WHERE id = ?`;
//     db.query(
//       sql,
//       [
//         data.username,
//         data.nomor_telepon,
//         data.alamat,
//         Number(data.id),
//       ],
//       (err, results) => {
//         if (err) reject(err);
//         else resolve(results);
//       }
//     );
//   });
