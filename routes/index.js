const express = require('express');
const { User, Data, Post } = require('../models');
const bcrypt = require('bcrypt');
const authMiddleware = require('./middleware/authMiddleware');

const router = express.Router();

// Unprotected Routes
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered!' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.session.userId = user.id;
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'An error occurred during logout' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

// Protected Routes
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ username: 'User', email: 'user@example.com' });
});

router.get('/data', authMiddleware, async (req, res) => {
    const data = await Data.findAll();
    res.json(data);
});

router.post('/posts', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }
    try {
        const newPost = await Post.create({
            title,
            content,
            userId: req.session.userId,
        });
        res.status(201).json({ message: 'Post created successfully.', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'An error occurred while creating the post.' });
    }
});

module.exports = router;
