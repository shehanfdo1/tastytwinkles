const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tastytwinkles').then(() => console.log('Connected for seeding'));

const products = [
    {
        name: "Vintage Floral Bloom",
        description: "A delicate vanilla sponge with sage green buttercream and hand-piped floral accents.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        variants: [
            { weight: "500g", price: 45 },
            { weight: "1kg", price: 80 }
        ]
    },
    {
        name: "Chocolate Truffle Dream",
        description: "Rich dark chocolate layers with a glossy ganache finish.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Placeholder
        variants: [
            { weight: "500g", price: 50 },
            { weight: "1kg", price: 90 }
        ]
    },
    {
        name: "Berry Chantilly",
        description: "Light chiffon cake topped with fresh strawberries and whipped cream.",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        variants: [
            { weight: "500g", price: 55 },
            { weight: "1kg", price: 95 }
        ]
    }
];

const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded!');
    mongoose.connection.close();
};

seedDB();
