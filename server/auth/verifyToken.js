const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied - Log in required')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;