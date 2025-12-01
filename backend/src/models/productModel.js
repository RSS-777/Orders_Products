const db = require('../db');

const DEFAULT_PHOTO = '/images/default.png';

const getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows.map(p => ({
    ...p,
    photo: p.photo || DEFAULT_PHOTO
  }));
};

const getProductsByOrderId = async (orderId) => {
  const [rows] = await db.query('SELECT * FROM products WHERE order_id = ?', [orderId]);
  return rows.map(p => ({
    ...p,
    photo: p.photo || DEFAULT_PHOTO
  }));
};

module.exports = { getAllProducts, getProductsByOrderId };
