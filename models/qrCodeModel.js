import mongoose from 'mongoose';

const qrCodeSchema = mongoose.Schema({
    note_id: { type: String },
    QRCodes: { type: String },
    createdAt: {
        type: Date,
        default: new Date().getTimezoneOffset()
    },

});

export default mongoose.model('QRCode', qrCodeSchema);