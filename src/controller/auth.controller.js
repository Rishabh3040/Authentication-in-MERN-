const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) 
{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "username, email and password are required" });
    }

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "A user with this username or email already exists"
            });
        }

        const user = await userModel.create({
            username,
            email,
            password
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "User already exists with this email or username"
            });
        }

        console.error("Register error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {registerUser};