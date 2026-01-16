const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const multer = require('multer');
const upload = multer({ dest: '/tmp' }); // Use /tmp for Vercel

// Create new order
router.post('/', upload.single('customPhoto'), async (req, res) => {
    try {
        // In a real app, upload to Cloudinary here
        const orderData = {
            ...req.body,
            items: JSON.parse(req.body.items),
            customPhoto: req.file ? req.file.path : null
        };

        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Check availability for a date
router.get('/availability', async (req, res) => {
    try {
        const { date } = req.query;
        // Logic: Count orders for this date. If > limit, return booked.
        // Simplified: just return count.
        const count = await Order.countDocuments({
            pickupDate: {
                $gte: new Date(date),
                $lt: new Date(new Date(date).setHours(23, 59, 59))
            }
        });
        res.json({ date, count, isFullyBooked: count >= 5 }); // Limit 5 orders per day
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
