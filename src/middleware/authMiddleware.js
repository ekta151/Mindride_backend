const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const jwtDecode = jwt.verify(token, 'inki pinki ponki');
        req.userId = jwtDecode.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: 'Unauthorized'
        });
    }
};