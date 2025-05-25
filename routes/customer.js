const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// @route   POST /api/customers
// @desc    Create a new customer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const newCustomer = new Customer({ name, email, phone, address });
    await newCustomer.save();

    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/customers
// @desc    Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
