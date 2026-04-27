const express = require('express');
const Product = require('../database/models/product');
const adminAuth = require('../middleware/auth');

const router = express.Router();



router.get('/all', async (req, res) => {
  try {
    const all = await Product.findAll();
    res.json(all);

  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Wrong id'
      });
    }

    const product = await Product.findOne({
      where: { id: +id }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json(product);

  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


router.post('/add', adminAuth, async (req, res) => {
  try {

    const {
      title,
      price,
      discont_price,
      description,
      categoryId
    } = req.body;

    if (!title || !price || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, price and description are required'
      });
    }

    const product = await Product.create({
      title,
      price,
      discont_price,
      description,
      categoryId: categoryId || 1
    });

    res.status(201).json({
      success: true,
      itemId: product.id,
      message: 'Product added successfully'
    });

  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Wrong id'
      });
    }

    const deleted = await Product.destroy({
      where: { id: +id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


module.exports = router;