import { NextFunction, Request, Response } from 'express';
import { checkAvailablePesanan, createPesanan, deletePesanan, findPesananById, getListPesanan, getListPesananByUser, updateStatusPesanan } from '../db/mysql/models/Pesanan';

export const createPesananUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPaket,
      iduser,
      harga,
      waktuPenggunaan,
      waktuPengembalian,
      nama,
      nomorTelepon,
      alamat,
      status, } = req.body;

    // let unitExist: any = await findJenisBarangByNama(namaJenisBarang);
    // if (unitExist.length > 0) {
    //   return res.status(400).send({
    //     success: false,
    //     data: null,
    //     message: 'Nama Unit sudah dipakai',
    //   });
    // }

    const data = await createPesanan({
      id_paket: idPaket,
      id_user: iduser,
      harga,
      waktu_penggunaan: waktuPenggunaan,
      waktu_pengembalian: waktuPengembalian,
      created_at: new Date(),
      nama,
      nomor_telepon: nomorTelepon,
      alamat,
      status,
    });

    return res.send({
      success: true,
      data: data,
      message: 'Berhasil membuat pesanan',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getListPesananUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query

    if (userId) {
      const data: any = await getListPesananByUser(Number(userId));

      return res.send({
        success: true,
        data: data,
        message: 'Berhasil get list pesanan',
      });

    } else {
      const data: any = await getListPesanan();

      return res.send({
        success: true,
        data: data,
        message: 'Berhasil get list pesanan',
      });

    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const deletePesananUseCase = async (
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
        message: 'Pesanan tidak ditemukan',
      });
    }

    await deletePesanan(Number(id));
    return res.send({
      success: true,
      data: null,
      message: 'Berhasil delete pesanan',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const updateStatusPesananUseCase = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, id } = req.body;
    await updateStatusPesanan({
      status,
      id: Number(id),
    });

    return res.send({
      success: true,
      data: null,
      message: 'Berhasil update unit',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};


export const getDetailPesananUseCase = async (
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
        message: 'Pesanan tidak ditemukan',
      });
    }
    let paket: any = await findPesananById(Number(id));
    paket = paket[0];

    if (!paket) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Pesanan tidak ditemukan',
      });
    }

    return res.send({
      success: true,
      data: paket,
      message: 'Berhasil get detail pesanan',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const checkAvailablePesananUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPaket, waktuPenggunaan } = req.body;
    let paket: any = await checkAvailablePesanan(Number(idPaket), waktuPenggunaan);
    paket = paket[0];

    if (paket) {
      return res.status(200).send({
        success: false,
        data: 'not_ready',
        message: 'not_ready',
      });
    } else {
      return res.send({
        success: true,
        data: 'ready',
        message: 'ready',
      });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};