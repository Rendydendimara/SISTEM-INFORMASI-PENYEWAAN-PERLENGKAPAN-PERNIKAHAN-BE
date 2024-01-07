import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/jwt';
import { getUserByToken } from '../db/mysql/models/User';

// handle verify token
export const isAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['si_penyewaan_pernikahan'] || req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      success: false,
      data: null,
      message: 'Token diperlukan untuk otentikasi',
    });
  }
  try {
    let user: any = await getUserByToken(token);
    if (!user) {
      return res.status(401).send({
        success: false,
        data: null,
        message: 'Pengguna tidak login',
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(401).send({
        success: false,
        data: null,
        message: 'Token kedaluwarsa',
      });
    }
    return res.status(401).send({
      success: false,
      data: null,
      message: err.message,
    });
  }
  return next();
};
