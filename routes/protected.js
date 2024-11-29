const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/admin', authenticate, authorizeRole('Admin'), (req, res) => {
    res.json({ message: 'Welcome Admin!' });
});

router.get('/user', authenticate, authorizeRole('User'), (req, res) => {
    res.json({ message: 'Welcome User!' });
});

router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
