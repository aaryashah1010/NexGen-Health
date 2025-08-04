const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
};

const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password || !phone || !role) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Validate role
        if (!['patient', 'admin'].includes(role)) {
            return res.status(400).json({
                message: 'Role must be either "patient" or "admin"'
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already existed with this email' });
        }
        
        const user = await User.create({ name, email, password, phone, role });
        const token = generateToken(user.id);
        
        res.json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isVerified: user.isVerified
            },
            token
        });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: 'Internal server error registration failed' })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Allow login even if account is not verified (for testing purposes)
        // You can uncomment this later when you implement email verification
        // if (!user.isVerified) {
        //     return res.status(401).json({ message: 'Account is not active' });
        // }
        
        const token = generateToken(user.id);
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isVerified: user.isVerified
            },
            token
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error login failed' })
    }
};

// Get current user (protected route)
const getCurrentUser = async (req, res) => {
    try {
        res.json({
            message: 'Current user retrieved successfully',
            user: req.user
        });
    } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: 'Failed to get current user' });
    }
};

module.exports = { register, login, getCurrentUser };