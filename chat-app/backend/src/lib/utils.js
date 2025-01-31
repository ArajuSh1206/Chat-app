import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
     expiresIN: "7d"   
    })

    res.cookie("jwt", token, { 
        maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7days only takes ms.
        httpOnly: true, // prevents xss attacks cross site scripting attacls
        sameSite: "strict", //CSRF attacks cross site request forgery attacks.
        secure: process.env.NODE_ENV !== "production", //https
    })
    
    return token;
} 