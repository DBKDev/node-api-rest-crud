module.exports = function extractBearerToken(req) {

    try {
        const auth = req.headers?.authorization;
        if (!auth || typeof auth !== 'string') return null;

        const [type, token] = auth.trim().split(' ');
        if (type !== 'Bearer' || !token) return null;

        return token;

    } catch (err) {
        return null;
    }
};