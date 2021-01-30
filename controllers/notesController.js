import mongoose from 'mongoose';
import NotesDB from '../models/notesModel.js';
import QRCodeDB from '../models/qrCodeModel.js';
import QRCode from 'qrcode';


// all data will be fetch
export const getNotes = async (req, res) => {
    try {
        const allNotes = await NotesDB.find();

        console.log('Getting All Note');
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get Single NotesDB | single data
export const getNote = async (req, res) => {
    const { id } = req.params;

    try {
        const singleNote = await NotesDB.findById(id);

        console.log('Search Single Note');
        
        res.status(200).json(singleNote);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create method 
export const createNote = async (req, res) => {
    const note = req.body; 
    
    

    const newNote = new NotesDB({ ...note, createdAt: new Date().toISOString() });

    const noteid = newNote._id;

    const NewQRcode = await QRCode.toDataURL(`${noteid}`, { errorCorrectionLevel: 'L' },)
        .then(url => {return url})
        .catch(err => {
            console.error(err);
        });
    
    const newqrcode = new QRCodeDB({ note_id: newNote._id, QRCodes: NewQRcode,  createdAt: new Date().toISOString() });
    
    
    console.log(newNote);
    console.log(newNote._id);
    console.log(newqrcode);
    console.log(`QRCodes >>> ${newqrcode.QRCodes}`);
    try {
        await newNote.save();
        await newqrcode.save();
        // console.log('New Note Added!');
        res.status(201).json({newNote, newqrcode});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Update method
export const updateNote = async (req, res) => {
    const { id: _id } = req.params;
    const note = req.body; 
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('NO Note with that id');

   
    const updatedNote = await NotesDB.findByIdAndUpdate(_id, {...note, _id}, { new: true });
    console.log('Updated Note!');
    res.json(updatedNote);
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO Note with that id');

   
    await NotesDB.findByIdAndRemove(id);

    console.log('DELETE!');

    res.json({ message: 'Note deleted Successfully'});
}
