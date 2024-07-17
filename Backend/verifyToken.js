const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json("You need to Login");
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.status(403).json("Token is not valid");
        req.userId = user._id;
        next();
    }); 

}
module.exports = verifyToken;