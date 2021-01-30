import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import noteRoutes from './routes/notesRouter.js';
import qrCodeRoutes from './routes/qrCodeRouter.js';

// Express 
const app = express();
dotenv.config();

const PORT = process.env.PORT;


// MongoDB Connection
const DB_URL = 'mongodb+srv://mongoaAtls:mongoaAtls123@cluster0.mc0e0.mongodb.net/NoteDB?retryWrites=true&w=majority';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS setup
app.use(cors());

// All Routes
app.use('/notes', noteRoutes);
app.use('/qrCode', qrCodeRoutes);

// this is localhost:5000/
app.get('/', (req, res) => res.send(`Hello From Notes and QRcode API ${PORT}`));

