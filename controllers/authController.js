const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const Blacklist = require('../models/Blacklist');

//Register

exports.register = async (req, res) => {
    try {
        const { username, password, roleName } = req.body;
        const role = await Role.findOne({ name: roleName });
        if (!role) return res.status(400).json({ error: 'Role not found' });

        const newUser = new User({ username, password, role: role._id });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//login

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).populate('role');
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//logout

exports.logout = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; 
        if (!token) return res.status(400).json({ error: 'Token not provided' });

        const newBlacklistToken = new Blacklist({ token });
        await newBlacklistToken.save();

        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};