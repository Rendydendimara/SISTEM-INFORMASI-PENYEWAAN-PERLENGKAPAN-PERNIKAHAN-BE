import express from 'express';
import { isAuth } from '../../middleware/userAuth';
import { asyncErrorHandler } from '../../middleware';
import {
  createPaketUseCase, deletePaketUseCase, getDetailPaketUseCase, getListPaketUseCase, updatePaketUseCase,
} from '../../repositories/Paket';
import multerImage from '../../config/multer/image';

const paketRouter = express.Router();

paketRouter.post(
  '/create',
  // asyncErrorHandler(isAuth),
  multerImage.array('images', 3),
  asyncErrorHandler(createPaketUseCase)
);
paketRouter.put(
  '/update',
  // asyncErrorHandler(isAuth),
  multerImage.array('images', 3),
  asyncErrorHandler(updatePaketUseCase)
);
paketRouter.get(
  '/get-list',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(getListPaketUseCase)
);
paketRouter.delete(
  '/delete/:id',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(deletePaketUseCase)
);
paketRouter.get(
  '/detail/:id',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(getDetailPaketUseCase)
);

export default paketRouter;
