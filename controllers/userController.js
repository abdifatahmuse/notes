import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/usersModel.js';

const secret = 'secret';

export const login = async (req, res) => {
    // login
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User does't exist." });

        const ispasswordcorrent = await bcrypt.compare(password, existingUser.password);

        if (!ispasswordcorrent) return res.status(400).json({ message: "Invalid credentials." });

        // the 'secret' of the jwt it will stored in .env file, to anyone can not see the secret key of jwt
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const register = async (req, res) => {
    // register
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exist." });

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });

        console.log(error);
    }
}