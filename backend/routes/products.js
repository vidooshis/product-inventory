const express = require('express');
const auth = require('../middleware/auth');
const Product = require('../models/product');
const router = express.Router();

// All product routes will be protected
router.use(auth);

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const { name, description, category, price, discountPercent, inStock } = req.body;
    
    const product = new Product({
      name,
      description,
      category,
      price,
      discountPercent: discountPercent || 0,
      inStock: inStock !== undefined ? inStock : true,
      createdBy: req.userId   // ✅ fixed here
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// Update product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId }, // only allow if user owns it
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// Delete product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
