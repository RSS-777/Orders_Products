const db = require('../db.js');

const getAllOrders = async () => {
  const [rows] = await db.query('SELECT * FROM orders');
  return rows;
};

const getOrderById = async (id) => {
  const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
};

module.exports = { getAllOrders, getOrderById };
