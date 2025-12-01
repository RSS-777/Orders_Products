const logger = require('./logger');
const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    logger.error('Error fetching products: %o', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts };
