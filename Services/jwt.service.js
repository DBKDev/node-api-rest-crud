const jwt = require('jsonwebtoken');

function signAuth(payload, options = {}) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
         expiresIn: '6h', 
         ...options });
}

function verifyAuth(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { signAuth, verifyAuth };
