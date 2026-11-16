const express = require('express');
const Product = require('../database/models/product');
const Category = require('../database/models/category');
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


// Fields that can be changed with PUT /products/:id
const UPDATABLE_FIELDS = [
  'title',
  'price',
  'discont_price',
  'description',
  'image',
  'categoryId'
];

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim() !== '';

const isPositiveNumber = (value) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

// Updates only the fields sent in the body; other fields stay the same.
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Wrong id'
      });
    }

    const body = req.body || {};
    const updates = {};

    UPDATABLE_FIELDS.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: `Nothing to update. Allowed fields: ${UPDATABLE_FIELDS.join(', ')}`
      });
    }

    const product = await Product.findOne({ where: { id: +id } });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Validation
    const errors = [];

    ['title', 'description', 'image'].forEach((field) => {
      if (field in updates && !isNonEmptyString(updates[field])) {
        errors.push(`${field} must be a non-empty string`);
      }
    });

    if ('price' in updates && !isPositiveNumber(updates.price)) {
      errors.push('price must be a number greater than 0');
    }

    if ('discont_price' in updates && updates.discont_price !== null) {
      const finalPrice = 'price' in updates ? updates.price : product.price;

      if (!isPositiveNumber(updates.discont_price)) {
        errors.push('discont_price must be a number greater than 0 or null');
      } else if (updates.discont_price >= finalPrice) {
        errors.push('discont_price must be lower than price');
      }
    }

    // A new price must stay higher than the existing discount price
    if (
      'price' in updates &&
      !('discont_price' in updates) &&
      product.discont_price !== null &&
      isPositiveNumber(updates.price) &&
      product.discont_price >= updates.price
    ) {
      errors.push(
        'price must be higher than the current discont_price (or send discont_price: null)'
      );
    }

    if ('categoryId' in updates) {
      const category = Number.isInteger(updates.categoryId)
        ? await Category.findOne({ where: { id: updates.categoryId } })
        : null;

      if (!category) {
        errors.push('categoryId must be the id of an existing category');
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    await product.update(updates);

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
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