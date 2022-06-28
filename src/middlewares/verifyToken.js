const jwt = require('jsonwebtoken');

module.exports = verifyToken = (req, res, next) => {
    if (!req.cookies['ACCESS_TOKEN']) {
        next();
        return;
    }

    jwt.verify(req.cookies['ACCESS_TOKEN'], process.env.SECRET_API_KEY || 'default', {}, err => {
        if (!err) {
            req.authToken = 'Verified';
        }

        next();
    });
};
