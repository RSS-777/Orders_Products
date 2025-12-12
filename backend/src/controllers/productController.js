const logger = require('../logger');
const Product = require('../models/productModel');
const path = require('path');
const fs = require('fs');
const DEFAULT_PHOTO = '/images/default.png';

const getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, error: 'No products found' });
    }

    const formattedProducts = products.map(p => ({
      ...p,
      photo: p.photo || DEFAULT_PHOTO
    }));

    return res.status(200).json({ success: true, data: formattedProducts });

  } catch (err) {
    logger.error('Error fetching products: %o', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { serialNumber, date, owner, status, title, type, specification, order_id, guarantee, price, isNew, photo } = req.body;

    if (!title || price == null || guarantee == null || !serialNumber || !date || !status || !order_id) {
      return res.status(400).json({ success: false, error: 'Missing required product fields' });
    }

    const photoUrl = req.file ? `/uploads/products/${req.file.filename}` : null;
    const newProduct = await Product.create({ serialNumber, date, owner, status, title, type, specification, order_id, guarantee, price, isNew, photoUrl });

    return res.status(201).json({ success: true, data: { id: newProduct } });

  } catch (err) {
    logger.error('Error creating product: %o', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
   const product = await Product.getById(productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const photoPath = product.photo
      ? path.join(__dirname, '../uploads/products', path.basename(product.photo))
      : null;

    const deleted = await Product.deleteById(productId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (photoPath && fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    return res.status(200).json({ success: true, message: 'Product deleted' });

  } catch (err) {
    logger.error('Error deleting product: %o', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { getProducts, createProduct, deleteProduct };