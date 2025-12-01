const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const logger = require('./logger');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();

    const ordersWithProducts = await Promise.all(
      orders.map(async o => ({
        ...o,
        products: await Product.getProductsByOrderId(o.id)
      }))
    );

    res.json(ordersWithProducts);
  } catch (err) {
    logger.error(`Failed to get orders: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.getOrderById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const products = await Product.getProductsByOrderId(id);
    res.json({ ...order, products });
  } catch (err) {
    logger.error(`Failed to get order ${req.params.id}: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getOrders, getOrder };
