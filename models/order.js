import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    deliveryDate: { type: Date, required: true, default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) }, // ✅ Auto-sets 5 days later
    createdAt: { type: Date, default: Date.now },
});


const Order = mongoose.model("Order", orderSchema);
export default Order;
