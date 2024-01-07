import bcrypt from 'bcrypt';
import { ROUNDED_SALT_BCRYPT } from '../config';

export const hashingPassword = async (password: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const passwordHash = await bcrypt.hash(password, ROUNDED_SALT_BCRYPT);
      resolve(passwordHash);
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });

export const isValidPassword = async function (
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const compare = await bcrypt.compare(password, hashedPassword);
  return compare;
};
