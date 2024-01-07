import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';
import {
  createUser,
  deleteUserById,
  findAllUserNotAdmin,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  getUserByToken,
  updateTokenUser,
  updateUser,
} from '../db/mysql/models/User';
import { createJWTToken } from '../helpers/jwt';
import { isValidPassword } from '../utils/password';

export const loginAccountUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, userType } = req.body;
    let user: any = await findUserByEmail(email);
    user = user[0];
    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Username atau password salah',
      });
    }

    const validate: boolean = await isValidPassword(password, user.password);

    if (!validate) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Username atau password salah',
      });
    }

    if (user.hak_akses !== userType) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Username atau password salah',
      });
    }

    const token = createJWTToken({
      id: user.id,
      userType: userType,
    });

    await updateTokenUser({ id: user.id, token });
    const data = {
      id: user.id,
      username: user.username,
      // password: user.password,
      nama: user.nama,
      hak_akses: user.hak_akses,
      alamat: user.alamat,
      email: user.email,
      nomor_telepon: user.nomor_telepon,
      token: token,
    };

    return res.send({
      success: true,
      data: data,
      message: 'Success login',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const checkLoginUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    let user: any = await getUserByToken(token);
    user = user[0];
    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Token tidak valid',
      });
    }

    const data = {
      id: user.id,
      username: user.username,
      // password: user.password,
      nama: user.nama,
      email: user.email,
      hak_akses: user.hak_akses,
      alamat: user.alamat,
      nomor_telepon: user.nomor_telepon,
      token: token,
    };

    jwt.verify(token, JWT_SECRET);
    return res.status(200).send({
      success: true,
      data: data,
      message: 'Login success',
    });
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Token kedaluwarsa',
      });
    }
    next(err);
  }
};

export const logoutAccountUseCase = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    await updateTokenUser({ id: Number(userId), token: '' });

    return res.send({
      success: true,
      data: null,
      message: 'Success logout',
    });
  } catch (err) {
    console.log('err', err);
    return res.status(400).send({
      success: true,
      data: err,
      message: 'Error logout',
    });
  }
};

export const createUserUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, alamat, nomorTelepon, email } = req.body;
    let user: any = await findUserByUsername(username);
    user = user[0];
    if (user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'Username sudah digunakan',
      });
    }
    await createUser({
      username,
      password,
      alamat,
      email,
      hakAkses: 'user',
      nomor_telepon: nomorTelepon,
      token: '',
    });

    return res.send({
      success: true,
      data: null,
      message: 'Success create user',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const deleteUserUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let user: any = await findUserById(Number(id));
    user = user[0];
    if (!user) {
      return res.status(400).send({
        success: false,
        data: null,
        message: 'User tidak ditemukan',
      });
    }

    await deleteUserById(Number(id));

    return res.send({
      success: true,
      data: null,
      message: 'Success delete user',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getAllUserNotAdminUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user: any = await findAllUserNotAdmin();

    return res.send({
      success: true,
      data: user,
      message: 'Success get user not admin',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const updateUserUseCase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { username, alamat, nomorTelepon, id } = req.body;
    let user: any = await findUserByUsername(username);
    user = user[0];
    if (user) {
      if (user.username !== username) {
        return res.status(400).send({
          success: false,
          data: null,
          message: 'Username sudah digunakan',
        });
      }
    }
    await updateUser({
      username,
      id,
      alamat,
      nomor_telepon: nomorTelepon,
    });


    return res.send({
      success: true,
      data: null,
      message: 'Success update user',
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
