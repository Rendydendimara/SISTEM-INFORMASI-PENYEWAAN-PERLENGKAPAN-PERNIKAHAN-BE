import express from 'express';
import { asyncErrorHandler } from '../../middleware';
import { isAuth } from '../../middleware/userAuth';
import {
  checkAvailablePesananUseCase,
  createPesananUseCase,
  deletePesananUseCase,
  getDetailPesananUseCase,
  getListPesananUseCase,
  updateStatusPesananUseCase
} from '../../repositories/Pesanan';

const pesananRouter = express.Router();

pesananRouter.post(
  '/create',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(createPesananUseCase)
);
pesananRouter.put(
  '/update-status',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(updateStatusPesananUseCase)
);
pesananRouter.get(
  '/get-list',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(getListPesananUseCase)
);
pesananRouter.get(
  '/detail/:id',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(getDetailPesananUseCase)
);
pesananRouter.delete(
  '/delete/:id',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(deletePesananUseCase)
);

pesananRouter.post(
  '/check-available',
  // asyncErrorHandler(isAuth),
  asyncErrorHandler(checkAvailablePesananUseCase)
);


export default pesananRouter;
