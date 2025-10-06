const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
 
dotenv.config();

const protect = (req, res, next) => {
    const token = req.headers.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    console.log("Token", req.headers.token);
 
    try {
        
        console.log(process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

        console.log("Decoded", decoded);
        req.user = decoded.userId;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = protect;
