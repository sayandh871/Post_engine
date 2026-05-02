import jwt from "jsonwebtoken";
import User from "../models/user.js"

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        //extract token
        token = req.headers.authorization.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user from db
        const user = await User.findById(decoded.sub).select("-password");

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }
        
        //attach user
        req.user = user;
        
        return next();

    }catch(err){
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        })
    }
  }

  return res.status(401).json({
    success: false,
    message: "Not authorized, no token"
  })
};


