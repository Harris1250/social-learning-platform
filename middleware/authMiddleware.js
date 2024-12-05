module.exports = (req, res, next) => {
    req.session.userId = 1; // Replace '1' with an existing user ID
    next();
};


/*
module.exports = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
*/

