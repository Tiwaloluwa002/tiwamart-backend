import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is not defined in environment variables!");
}

// Middleware to check validation results
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }
    next();
};

// Signup Route
router.post(
    "/api/auth/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    validateRequest,
    async (req, res) => {
        console.log("Signup Request:", req.body);

        try {
            const { name, email, password } = req.body;

            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exists" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({ name, email, password: hashedPassword });
            await user.save();

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

            res.status(201).json({
                message: "User registered successfully",
                token,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error("❌ Signup error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

// Login Route
router.post(
    "/login",
    [
        body("email").trim().isEmail().withMessage("Enter a valid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    validateRequest,
    async (req, res) => {
        console.log("Login Request Received:", req.body);

        try {
            const { email, password } = req.body;
            console.log("Processing login for:", email);

            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({
                message: "Login successful",
                token,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            console.error("❌ Login error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

export default router;
