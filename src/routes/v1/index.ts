import express from 'express';
import authRouter from './auth';
import paketRouter from './paket';
import pesananRouter from './pesanan';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/pesanan', pesananRouter);
router.use('/paket', paketRouter);

export default router;
