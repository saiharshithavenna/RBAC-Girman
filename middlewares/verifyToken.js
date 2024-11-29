const jwt = require('jsonwebtoken');
const Blacklist = require('../models/Blacklist');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).json({ error: 'Token is required' });

        //check if the token is blacklisted
        const blacklistedToken = await Blacklist.findOne({ token });
        if (blacklistedToken) return res.status(401).json({ error: 'Token has been invalidated' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
