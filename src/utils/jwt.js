import jwt from "jsonwebtoken"

export const generateToken = (userId, role) => {
    
    const payload = {
        sub: userId,
        role: role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
}