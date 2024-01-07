import express from 'express';
import { isAuth } from '../../middleware/userAuth';
import { asyncErrorHandler } from '../../middleware';
import {
  checkLoginUseCase,
  createUserUseCase,
  deleteUserUseCase,
  getAllUserNotAdminUseCase,
  loginAccountUseCase,
  logoutAccountUseCase,
  updateUserUseCase,
} from '../../repositories/Auth';

const authRouter = express.Router();

authRouter.post('/login', asyncErrorHandler(loginAccountUseCase));
authRouter.post('/check-login', asyncErrorHandler(checkLoginUseCase));
authRouter.post('/logout', asyncErrorHandler(logoutAccountUseCase));
authRouter.get(
  '/get-all-user',
  asyncErrorHandler(getAllUserNotAdminUseCase)
);
authRouter.post('/register', asyncErrorHandler(createUserUseCase));
authRouter.delete('/delete/:id', asyncErrorHandler(deleteUserUseCase));
authRouter.put('/update-user', asyncErrorHandler(updateUserUseCase));

export default authRouter;
