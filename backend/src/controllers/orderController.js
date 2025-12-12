const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const path = require('path');
const fs = require('fs');
const logger = require('../logger');

const DEFAULT_PHOTO = '/images/default.png';
const UPLOAD_DIR = path.join(__dirname, '../uploads/products');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();

    const ordersWithProducts = await Promise.all(
      orders.map(async o => ({
        ...o,
        products: await Product.getProductsByOrderId(o.id)
      }))
    );

    res.status(200).json({ success: true, data: ordersWithProducts });
  } catch (err) {
    logger.error(`Failed to get orders: ${err.message}`);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, error: 'Title and date are required' });
    }

    await Order.createOrder({ title, description, date });

     res.status(201).json({ success: true });
  } catch (err) {
    logger.error(`Failed to create order: ${err.message}`);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);

    const order = await Order.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const products = await Product.getProductsByOrderId(orderId);

    for (const p of products) {
      if (p.photo && p.photo !== DEFAULT_PHOTO) {
        const photoPath = path.join(UPLOAD_DIR, path.basename(p.photo));
        if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
      }
      await Product.deleteById(p.id);
    }

    await Order.deleteById(orderId);

    res.status(200).json({ success: true, message: 'Order and related products deleted successfully' });
  } catch (err) {
    logger.error(`Failed to delete order: ${err.message}`);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { getOrders, createOrder, deleteOrder };

