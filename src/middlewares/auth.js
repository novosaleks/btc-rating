const httpStatus = require('../constants/httpStatus')

module.exports = auth = (req, res, next) => {
    if (req.authToken === 'Verified') {
        next();
    } else {
        res.statusCode = httpStatus.FORBIDDEN;

        res.json({ok: false, message: 'Not authorized'});
    }
};
