const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        weight: String,
        price: Number,
        quantity: { type: Number, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    pickupDate: { type: Date, required: true },
    customText: { type: String },
    customPhoto: { type: String }, // Path to uploaded file
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'completed', 'cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
