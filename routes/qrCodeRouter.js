import express from 'express';
import { getQrCode } from '../controllers/qrCodeController.js';

const qrcodeRouter = express.Router();

qrcodeRouter.get('/', getQrCode);

export default qrcodeRouter;
