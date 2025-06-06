const nodemailer = require('nodemailer');

// Setup reusable transporter using Gmail or any SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email (set in .env)
    pass: process.env.EMAIL_PASS  // Your password or app password (also in .env)
  }
});

// Optional: verify connection config
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email setup error:', error);
  } else {
    console.log('Nodemailer is ready to send messages');
  }
});

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const User = require('../models/User'); // Make sure you have access to customer info

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

    // Fetch customer email (assuming customer is a user ID)
    const customerData = await User.findById(customer).select('email name');

    // Send confirmation email
    if (customerData && customerData.email) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerData.email,
        subject: 'Order Confirmation - Easdon Order Management',
        text: `Hi ${customerData.name},\n\nThank you for placing your order!\n\nOrder ID: ${savedOrder._id}\nProduct: ${product}\nQuantity: ${quantity}\n\nWe’ll keep you updated.\n\nEasdon Support`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Failed to send confirmation email:', error);
        } else {
          console.log('Confirmation email sent:', info.response);
        }
      });
    }

    res.status(201).json({ message: 'Order created', order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

module.exports = router;
