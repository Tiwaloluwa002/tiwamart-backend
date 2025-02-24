import mongoose from 'mongoose';

// Define the schema
const itemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    imageSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stars: { type: Number, required: true },
    rates: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    type: { type: String, required: true },
    details: { type: String, required: true },
    state: { type: Number, default: 0 }, // Optional field
});

// Create the model
const Item = mongoose.model('Item', itemSchema);

// Export the model
export default Item;
