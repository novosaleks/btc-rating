const jwt = require('jsonwebtoken');

module.exports = generateToken = (payload, options = {}) => {
    return jwt.sign(payload, process.env.SECRET_API_KEY || 'default', options);
};
