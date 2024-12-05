const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize, User, Post } = require('./models');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session Middleware
app.use(
    session({
        secret: 'your-secret-key', // Replace with an environment variable in production
        store: new SequelizeStore({ db: sequelize }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// Protect sensitive routes with middleware
app.use('/api', authMiddleware);

// Routes

// Logout Route
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'An error occurred during logout' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

// Create a post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        const post = await Post.create({ title, content, userId });
        res.status(201).json({ message: 'Post created successfully!', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post.' });
    }
});

// Sync database and start server
sequelize
    .sync({ alter: true }) // Ensures the database is updated without dropping data
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
