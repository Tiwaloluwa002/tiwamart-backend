// orderRoutes.js
import express from "express";
import Order from "./models/order.js"; // Assuming you have an Order model
const router = express.Router();

// Fetch orders for a user (Authenticated Route)
router.get("/", async (req, res) => {
    try {
        // Assuming the user is authenticated and `req.user.id` is set
        const orders = await Order.find({ userId: req.user.id }); // Fetch orders by user ID
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// Create a new order (you can call this after a successful payment)
router.post("/", async (req, res) => {
    try {
        const { userId, items } = req.body; // Order details sent from frontend

        // Save the order to the database
        const newOrder = new Order({
            userId,
            items, // Assuming this contains the product IDs and quantities
            totalAmount: req.body.totalAmount,
            purchaseDate: new Date(),
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: "Error saving order" });
    }
});

export default router;
