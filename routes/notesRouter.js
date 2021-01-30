import express from 'express';
import { getNotes, getNote, createNote, updateNote, deleteNote } from '../controllers/notesController.js';
import auth from '../middleware/auth.js';

const noteRouter = express.Router();

noteRouter.get('/', auth, getNotes);
noteRouter.post('/', auth, createNote);
noteRouter.get('/:id', auth, getNote);
noteRouter.patch('/:id', auth, updateNote);
noteRouter.delete('/:id', auth, deleteNote);

export default noteRouter;