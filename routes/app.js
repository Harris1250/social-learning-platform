const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes'); // Unified routes

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Set to true in production
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

// Unified Routes
app.use('/api', routes);

// Serve HTML Files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred!' });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
