import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import Stripe from "stripe";
import orderRoutes from "./orderRoutes.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.log("❌ MongoDB connection error:", err));

// Import Models
import Item from "./models/items.js";
import User from "./models/user.js";

// Routes

// Home route
app.get("/", (req, res) => {
    res.send("E-commerce API is running...");
});

// 📌 Product Routes

// Fetch all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Item.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch a single product by ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Item.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new product
app.post("/api/products", async (req, res) => {
    const product = new Item(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a product by ID
app.put("/api/products/:id", async (req, res) => {
    try {
        const product = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product by ID
app.delete("/api/products/:id", async (req, res) => {
    try {
        const product = await Item.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 📌 User Authentication Routes

// Register a new user
app.post(
    "/api/auth/register",
    [
        body("name", "Name is required").not().isEmpty(),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        console.log("📨 Signup Request:", { name, email, password }); // Debugging
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({ name, email, password: hashedPassword });
            await user.save();

            // Generate a token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            console.log("Token generated:", token); // Debugging line
            // Send token in response
            res.status(201).json({
                message: "User registered successfully",
                token,
                user: { id: user._id, name: user.name, email: user.email },
            });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

// Login user
app.post(
    "/api/auth/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
            console.log("Response sent:", {
    message: "User registered successfully",
    token,
    user: { id: user._id, name: user.name, email: user.email },
});
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

// Middleware for protected routes
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Example protected route
app.get("/api/auth/protected", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the protected route!", user: req.user });
});
// 📌 Stripe Payment Route
app.post("/api/payment", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid payment amount" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert dollars to cents
            currency: "usd",
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ error: "Failed to create payment intent" });
    }
});


// Use order routes
app.use("/api/orders", orderRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));