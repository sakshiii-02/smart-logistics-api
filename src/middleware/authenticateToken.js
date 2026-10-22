const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    try{
        const authHeader = req.headers["authorization"];

        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "Authorization header is missing"
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            role: decoded.role
        }
        next();
    } catch (err) {
         if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError" ||
            err.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired access token"
            });
        }

        next(err);
    }
}

module.exports = authenticateToken;
