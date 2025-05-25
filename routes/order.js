const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// @route   GET /api/orders
// @desc    Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// @route   POST /api/orders
// @desc    Create a new order (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { customer, product, quantity } = req.body;

  try {
    const order = new Order({
      customer,
      product,
      quantity,
      status: 'pending'
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order created', order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

module.exports = router;
