const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { User } = require('../../../database/models/user');

router.get('/', (req, res) => {
    res.json({ message: 'Users list' });
});

router.post('/', async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: 'Missing required fields' });
            return
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password_hash
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;