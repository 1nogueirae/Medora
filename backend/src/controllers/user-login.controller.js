const bcrypt = require('bcryptjs');
const { User } = require('../database/models');

const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            where: {
                email: normalizedEmail
            }
        });

        if (!existingUser) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password_hash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            },
            bearerToken: token
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = {
    login
};