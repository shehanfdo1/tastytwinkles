const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL or path
    category: { type: String, default: 'cake' },
    variants: [{
        weight: { type: String, required: true }, // e.g., '500g', '1kg'
        price: { type: Number, required: true }
    }],
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
