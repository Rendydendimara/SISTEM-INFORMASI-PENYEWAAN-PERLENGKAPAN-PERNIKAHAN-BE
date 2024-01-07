import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/jwt';
import jwt from 'jsonwebtoken';

export const createJWTToken = (user: { id: number; userType: string }) =>
  jwt.sign(
    {
      userId: user.id,
      userType: user.userType,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
