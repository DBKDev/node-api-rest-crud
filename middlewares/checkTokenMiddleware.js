const extractBearerToken = require('../utils/extractBearerToken');
const { verifyAuth } = require('../Services/jwt.service');

module.exports = function checkTokenMiddleware(req, res, next) {
  const token = extractBearerToken(req);
  if (!token) return res.status(401).json({ error: 'Token manquant' });
  try {
    req.auth = verifyAuth(token);
    return next();
  } catch {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
};
