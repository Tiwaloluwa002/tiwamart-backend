import mongoose from 'mongoose';
import Item from './models/items.js'; // Adjust the path as needed
import i18n from '../src/components/common/components/LangConfig.js'; // Adjust the path as needed

// Initialize idCounter
let idCounter = 0;

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://tiwaloluwaakinsola1:ayomide2@cluster1.c5ygv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Your ITEMS array
const ITEMS = [
    {
        id: String(idCounter++),
        imageSrc: "../assets/car.png",
        title: i18n.t("itemsArray.0.title"),
        price: 960,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        quantity: 0,
        type: i18n.t("itemsArray.0.type"),
        details: i18n.t("itemsArray.0.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/camera.png",
        title: i18n.t("itemsArray.1.title"),
        price: 360,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        quantity: 0,
        type: i18n.t("itemsArray.1.type"),
        details: i18n.t("itemsArray.1.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/dogfood.png",
        price: 100,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        quantity: 0,
        title: i18n.t("itemsArray.2.title"),
        type: i18n.t("itemsArray.2.type"),
        details: i18n.t("itemsArray.2.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/labtop.png",
        price: 700,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        quantity: 0,
        title: i18n.t("itemsArray.3.title"),
        type: i18n.t("itemsArray.3.type"),
        details: i18n.t("itemsArray.3.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/cream.png",
        price: 500,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        quantity: 0,
        title: i18n.t("itemsArray.4.title"),
        type: i18n.t("itemsArray.4.type"),
        details: i18n.t("itemsArray.4.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/g-black.png",
        price: 660,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 40,
        quantity: 0,
        title: i18n.t("itemsArray.5.title"),
        type: i18n.t("itemsArray.5.type"),
        details: i18n.t("itemsArray.5.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/jacket.png",
        price: 660,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 40,
        quantity: 0,
        title: i18n.t("itemsArray.6.title"),
        type: i18n.t("itemsArray.6.type"),
        details: i18n.t("itemsArray.6.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/bookself.png",
        price: 360,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 40,
        quantity: 0,
        title: i18n.t("itemsArray.7.title"),
        type: i18n.t("itemsArray.7.type"),
        details: i18n.t("itemsArray.7.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/headphones.png",
        price: 160,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 40,
        quantity: 0,
        title: i18n.t("itemsArray.8.title"),
        type: i18n.t("itemsArray.8.type"),
        details: i18n.t("itemsArray.8.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/bag.png",
        price: 1160,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 40,
        quantity: 0,
        title: i18n.t("itemsArray.9.title"),
        type: i18n.t("itemsArray.9.type"),
        details: i18n.t("itemsArray.9.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/coat.png",
        price: 360,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 40,
        quantity: 0,
        title: i18n.t("itemsArray.10.title"),
        type: i18n.t("itemsArray.10.type"),
        details: i18n.t("itemsArray.10.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/g-colored.png",
        price: 160,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 40,
        quantity: 0,
        title: i18n.t("itemsArray.11.title"),
        type: i18n.t("itemsArray.11.type"),
        details: i18n.t("itemsArray.11.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/keyboard.png",
        price: 1160,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 35,
        quantity: 0,
        title: i18n.t("itemsArray.12.title"),
        type: i18n.t("itemsArray.12.type"),
        details: i18n.t("itemsArray.12.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/tv.png",
        price: 400,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 30,
        quantity: 0,
        title: i18n.t("itemsArray.13.title"),
        type: i18n.t("itemsArray.13.type"),
        details: i18n.t("itemsArray.13.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/chair.png",
        price: 400,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: 25,
        quantity: 0,
        title: i18n.t("itemsArray.14.title"),
        type: i18n.t("itemsArray.14.type"),
        details: i18n.t("itemsArray.14.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/JBL_BOOMBOX.png",
        price: 1200,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        state: 1,
        quantity: 0,
        title: i18n.t("itemsArray.15.title"),
        type: i18n.t("itemsArray.15.type"),
        details: i18n.t("itemsArray.15.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/perfume.png",

        price: 1200,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        state: 1,
        quantity: 0,
        title: i18n.t("itemsArray.16.title"),
        type: i18n.t("itemsArray.16.type"),
        details: i18n.t("itemsArray.16.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/iphone16.png",
        price: 1200,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        state: 1,
        quantity: 0,
        title: i18n.t("itemsArray.17.title"),
        type: i18n.t("itemsArray.17.type"),
        details: i18n.t("itemsArray.17.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/playstation.png",
        price: 1200,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        state: 1,
        quantity: 0,
        title: i18n.t("itemsArray.18.title"),
        type: i18n.t("itemsArray.18.type"),
        details: i18n.t("itemsArray.18.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/speakers.png",
        price: 1200,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        state: 1,
        quantity: 0,
        title: i18n.t("itemsArray.19.title"),
        type: i18n.t("itemsArray.19.type"),
        details: i18n.t("itemsArray.19.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/womenCollections.png",
        price: 1200,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        state: 1,
        quantity: 0,
        title: i18n.t("itemsArray.20.title"),
        type: i18n.t("itemsArray.20.type"),
        details: i18n.t("itemsArray.20.details"),
    },
    {
        id: String(idCounter++),
        imageSrc: "../assets/shoes.png",
        price: 400,
        stars: Math.floor(Math.random() * 3) + 3,
        rates: Math.floor(Math.random() * 100),
        discount: "",
        state: 1,
        quantity: 0,
        title: i18n.t("itemsArray.21.title"),
        type: i18n.t("itemsArray.21.type"),
        details: i18n.t("itemsArray.21.details"),
    },
];

// Function to insert items into MongoDB
const seedDatabase = async () => {
    try {
        const existingItems = await Item.find({});
        if (existingItems.length === 0) {
            await Item.insertMany(ITEMS);
            console.log("Items inserted successfully.");
        } else {
            console.log("Database already seeded.");
        }
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        mongoose.connection.close();
    }
};


// Run the seed function
seedDatabase();