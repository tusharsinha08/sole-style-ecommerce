require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized access - No token" })
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized access - Invalid token" })
    }

    // verify token---------------
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Forbidden - Token invalid or expired" });
        }

        // attach decoded user info to request
        req.user = decoded;
        next();
    })
}

module.exports = {
    verifyToken
}