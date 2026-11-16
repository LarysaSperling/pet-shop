const express = require('express');
const Product = require('../database/models/product');
const adminAuth = require('../middleware/auth');
const {
  PRODUCT_FIELDS,
  pickProductFields,
  validateProduct
} = require('../validation/productValidation');

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

    const data = pickProductFields(req.body);
    const errors = await validateProduct(data);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const product = await Product.create({
      ...data,
      categoryId: data.categoryId ?? 1
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

    const updates = pickProductFields(req.body);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: `Nothing to update. Allowed fields: ${PRODUCT_FIELDS.join(', ')}`
      });
    }

    const product = await Product.findOne({ where: { id: +id } });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const errors = await validateProduct(updates, { currentProduct: product });

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