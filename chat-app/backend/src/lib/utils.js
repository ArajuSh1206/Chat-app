import jwt from "jsonwebtoken";

// Token Generation Function
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days (ms)
        httpOnly: true, // Prevents XSS attacks
        sameSite: "strict", // Protects against CSRF attacks
        secure: process.env.NODE_ENV === "production", // HTTPS in production
    });

    return token;
};