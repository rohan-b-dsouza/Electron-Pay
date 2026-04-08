import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next)=> {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("123321");
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(error) {
        console.log("123321");
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}
