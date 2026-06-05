const bcrypt = require('bcryptjs');
const { User } = require('../database/models');

async function create(req, res) {
    try {
        const { name, email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            where: {
                email: normalizedEmail
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: `E-mail ${normalizedEmail} is already in use`
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email: normalizedEmail,
            password_hash
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = {
    create
};