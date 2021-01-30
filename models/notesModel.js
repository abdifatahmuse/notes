import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String, required: true },
    QRCode: { type: String },
    createdAt: {
        type: Date,
        default: new Date().getTimezoneOffset()
    },
    latestEdit: {
        type: Date,
        default: new Date().getTimezoneOffset()
    },

});

export default mongoose.model('Note', noteSchema);