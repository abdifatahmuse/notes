import QRCodeDB from '../models/qrCodeModel.js';

// all data will be fetch
export const getQrCode = async (req, res) => {
    try {
        const allqrCode = await QRCodeDB.find();

        console.log('Getting All QrCode');
        res.status(200).json(allqrCode);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}