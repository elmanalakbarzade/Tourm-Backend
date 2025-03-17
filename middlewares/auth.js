const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token")

    if (!token) {
        return res.status(401).send("Buralar Senlik Deyil!!!")
    }
    try {
        const decodedToken = jwt.verify(token, "jwtPrivateKey")
        req.user = decodedToken
        next();
    } catch (error) {
        res.status(401).send("Sehvdir!")
    }
}