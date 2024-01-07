import { NextFunction, Request, Response } from 'express';
import { createPaket, deletePaketById, getDetailPaket, getListPaket, updatePaket } from '../db/mysql/models/Paket';
import { PORT } from '../config';

export const createPaketUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      nama,
      harga,
      makeUp,
      gaunWanita,
      kemejaPria,
      dekorKamarPengantin,
      dekorPanggung,
      mejaKursiAkad,
      tendaTerimaTamu,
      mejaTerimaTamu,
    } = req.body;

    const images: any = req.files;
    let imagesUrl: string[] = [];
    for (const image of images) {
      if (image.path) {
        // const filePath =
        //   config.NODE_ENV === 'development'
        //     ? `${req.protocol}://${req.hostname}:${port}/${image.path}`
        //     : `${config.BACKEND_URL}/${image.path}`;
        const filePath = `${req.protocol}://${req.hostname}:${PORT}/${image.path}`
        imagesUrl.push(filePath);
      }
    }

    const data = await createPaket({
      nama,
      harga,
      make_up: makeUp,
      gaun_wanita: gaunWanita,
      kemeja_pria: kemejaPria,
      dekor_kamar_pengantin: dekorKamarPengantin,
      dekor_panggung: dekorPanggung,
      meja_kursi_akad: mejaKursiAkad,
      tenda_terima_tamu: tendaTerimaTamu,
      meja_terima_tamu: mejaTerimaTamu,
      gambar: imagesUrl.join(','),
    });

    return res.send({
      success: true,
      data: data,
      message: 'Berhasil membuat paket',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getListPaketUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const barang: any = await getListPaket();

    return res.send({
      success: true,
      data: barang,
      message: 'Berhasil get list barang',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getDetailPaketUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Paket tidak ditemukan',
      });
    }
    let paket: any = await getDetailPaket(Number(id));
    paket = paket[0];

    if (!paket) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Paket tidak ditemukan',
      });
    }

    return res.send({
      success: true,
      data: paket,
      message: 'Berhasil get detail paket',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const deletePaketUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Paket tidak ditemukan',
      });
    }

    await deletePaketById(Number(id));
    return res.send({
      success: true,
      data: null,
      message: 'Berhasil delete Paket',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const updatePaketUseCase = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      id,
      nama,
      harga,
      makeUp,
      gaunWanita,
      kemejaPria,
      dekorKamarPengantin,
      dekorPanggung,
      mejaKursiAkad,
      tendaTerimaTamu,
      mejaTerimaTamu,
      oldImages
    } = req.body;

    const images: any = req.files;
    let imagesUrl: string[] = [];
    for (const image of images) {
      if (image.path) {
        // const filePath =
        //   config.NODE_ENV === 'development'
        //     ? `${req.protocol}://${req.hostname}:${port}/${image.path}`
        //     : `${config.BACKEND_URL}/${image.path}`;
        const filePath = `${req.protocol}://${req.hostname}:${PORT}/${image.path}`
        imagesUrl.push(filePath);
      }
    }
    let fixImages = [];
    const fixOldImages = JSON.parse(oldImages)
    if (fixOldImages.length > 0) {
      fixImages = fixOldImages;
    }
    fixImages = [...fixImages, ...imagesUrl];

    const data = await updatePaket({
      id: Number(id),
      nama,
      harga,
      make_up: makeUp,
      gaun_wanita: gaunWanita,
      kemeja_pria: kemejaPria,
      dekor_kamar_pengantin: dekorKamarPengantin,
      dekor_panggung: dekorPanggung,
      meja_kursi_akad: mejaKursiAkad,
      tenda_terima_tamu: tendaTerimaTamu,
      meja_terima_tamu: mejaTerimaTamu,
      gambar: fixImages.join(',')
    });

    return res.send({
      success: true,
      data: null,
      message: 'Berhasil update paket',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

// export const getListBarangByUnitUseCase = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { unitId } = req.params;
//     let barang: any = await getListBarangByUnit(Number(unitId));

//     return res.send({
//       success: true,
//       data: barang,
//       message: 'Berhasil get list barang',
//     });
//   } catch (e) {
//     console.log(e);
//     next(e);
//   }
// };

// export const printLaporan = async (req: any, res: any, next: any) => {
//   try {
//     const barang: any = await getListBarang();

//     const path = `uploads/laporan/${new Date()
//       .getTime()
//       .toString()}-laporan.pdf`;

//     cetakLaporan(barang, path);

//     await delay(2000);

//     return res.download(path);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// export const getLaporanPerJenisBarang = async (
//   req: any,
//   res: any,
//   next: any
// ) => {
//   try {
//     let barang: any = await getListBarang();
//     barang = groupBy(barang, 'nama_unit');
//     let data: any = [];
//     for (var index in barang) {
//       let r2baik = 0;
//       let r2rr = 0;
//       let r2rb = 0;
//       let r4baik = 0;
//       let r4rr = 0;
//       let r4rb = 0;
//       barang[index].forEach((dt: any) => {
//         if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r2rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r2baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r2rr += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r4rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r4baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r4rr += 1;
//         }
//       });

//       data.push({
//         unit: index,
//         r2baik,
//         r2rr,
//         r2rb,
//         r4baik,
//         r4rr,
//         r4rb,
//       });
//     }

//     return res.send({
//       success: true,
//       data: data,
//       message: 'Berhasil get laporan barang per jenis',
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// export const printLaporanPerJenisBarang = async (
//   req: any,
//   res: any,
//   next: any
// ) => {
//   try {
//     let barang: any = await getListBarang();
//     barang = groupBy(barang, 'nama_unit');
//     let data: any = [];
//     for (var index in barang) {
//       let r2baik = 0;
//       let r2rr = 0;
//       let r2rb = 0;
//       let r4baik = 0;
//       let r4rr = 0;
//       let r4rb = 0;
//       barang[index].forEach((dt: any) => {
//         if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r2rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r2baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r2rr += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r4rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r4baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r4rr += 1;
//         }
//       });

//       data.push({
//         unit: index,
//         r2baik,
//         r2rr,
//         r2rb,
//         r4baik,
//         r4rr,
//         r4rb,
//       });
//     }

//     const path = `uploads/laporan/${new Date()
//       .getTime()
//       .toString()}-laporan-per-jenis.pdf`;

//     cetakLaporanPerJenis(data, path);

//     await delay(2000);

//     return res.download(path);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// export const getLaporanPerJenisBarangByUnit = async (
//   req: any,
//   res: any,
//   next: any
// ) => {
//   try {
//     const { id } = req.params;
//     let barang: any = await getListBarangByUnit(id);
//     barang = groupBy(barang, 'nama_unit');
//     let data: any = [];
//     for (var index in barang) {
//       let r2baik = 0;
//       let r2rr = 0;
//       let r2rb = 0;
//       let r4baik = 0;
//       let r4rr = 0;
//       let r4rb = 0;
//       barang[index].forEach((dt: any) => {
//         if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r2rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r2baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r2rr += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r4rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r4baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r4rr += 1;
//         }
//       });

//       data.push({
//         unit: index,
//         r2baik,
//         r2rr,
//         r2rb,
//         r4baik,
//         r4rr,
//         r4rb,
//       });
//     }
//     return res.send({
//       success: true,
//       data: data,
//       message: 'Berhasil get laporan barang per jenis',
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// export const printLaporanPerJenisBarangByUnit = async (
//   req: any,
//   res: any,
//   next: any
// ) => {
//   try {
//     const { id } = req.params;
//     let barang: any = await getListBarangByUnit(id);
//     barang = groupBy(barang, 'nama_unit');
//     let data: any = [];
//     for (var index in barang) {
//       let r2baik = 0;
//       let r2rr = 0;
//       let r2rb = 0;
//       let r4baik = 0;
//       let r4rr = 0;
//       let r4rb = 0;
//       barang[index].forEach((dt: any) => {
//         if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r2rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r2baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 2' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r2rr += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Berat'
//         ) {
//           r4rb += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Baik'
//         ) {
//           r4baik += 1;
//         } else if (
//           dt.nama_jenis_barang === 'Roda 4' &&
//           dt.keadaan_barang === 'Rusak Ringan'
//         ) {
//           r4rr += 1;
//         }
//       });

//       data.push({
//         unit: index,
//         r2baik,
//         r2rr,
//         r2rb,
//         r4baik,
//         r4rr,
//         r4rb,
//       });
//     }

//     const path = `uploads/laporan/${new Date()
//       .getTime()
//       .toString()}-laporan-per-jenis.pdf`;

//     cetakLaporanPerJenis(data, path);

//     await delay(2000);

//     return res.download(path);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// export const printLaporanByUnit = async (req: any, res: any, next: any) => {
//   try {
//     const { id } = req.params;
//     let barang: any = await getListBarangByUnit(id);
//     let unit: any = await findUnitById(Number(id));
//     console.log(unit);
//     const path = `uploads/laporan/${new Date()
//       .getTime()
//       .toString()}-laporan-perunit.pdf`;

//     cetakLaporan(barang, path, unit[0].nama_unit);

//     await delay(2000);

//     return res.download(path);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// export const printLaporanPertahun = async (req: any, res: any, next: any) => {
//   try {
//     const { id } = req.query;
//     let barang: any = await getListBarang();
//     if (id) {
//       barang = await getListBarangByUnit(Number(id));
//     } else {
//       barang = await getListBarang();
//     }

//     let temp: any = [];
//     barang.forEach((dt: any, i: any) => {
//       temp.push({
//         no: i + 1,
//         id: dt.id,
//         namaUnit: dt.nama_unit,
//         namaPemegang: dt.nama_pemegang,
//         namaAset: dt.nama_barang,
//         tahunPembelian: dt.tahun_pembelian,
//         usiaKendaraan: new Date().getFullYear() - Number(dt.tahun_pembelian),
//         tahunBerjalan: new Date().getFullYear(),
//       });
//     });
//     temp = sortBy(temp, 'tahunPembelian');

//     const path = `uploads/laporan/${new Date()
//       .getTime()
//       .toString()}-laporan-pertahun.pdf`;

//     cetakLaporanPertahun(temp, path);

//     await delay(2000);

//     return res.download(path);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
