const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Token not provided'
        });
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
        return res.status(401).json({
            message: 'Invalid token format'
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

module.exports = authenticate;