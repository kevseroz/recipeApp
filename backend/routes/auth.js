const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({ username, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id, username: username }, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
