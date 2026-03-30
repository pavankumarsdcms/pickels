const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const Product = require('../models/Product');

// Create new order (Public)
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    // Reduce stock for each item in the order
    for (const item of order.orderItems) {
      if (item.product) {
        await Product.findByIdAndUpdate(
          item.product._id || item.product, 
          { $inc: { stock: -item.quantity } }
        );
      }
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (Admin)
router.patch('/:id/status', async (req, res) => {
  try {
    const { orderStatus, trackingId } = req.body;
    const updateData = { orderStatus };
    if (trackingId !== undefined) updateData.trackingId = trackingId;
    
    const modifiedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(modifiedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
