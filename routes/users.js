import express from 'express';
const router = express.Router();

// Controllers
import { login, register } from '../controllers/userController.js';

// localhost:5000/user/
router.post('/login', login);
router.post('/register', register);

export default router;