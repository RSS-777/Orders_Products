const db = require('../db.js');

const getAllOrders = async () => {
  const [rows] = await db.query('SELECT * FROM orders');
  return rows;
};

const getOrderById = async (id) => {
  const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
};

const deleteById = async (id) => {
  const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
  return result;
};

const createOrder = async ({ title, description, date }) => {
  const [result] = await db.query(
    'INSERT INTO orders (title, description, date) VALUES (?, ?, ?)',
    [title, description || null, date]
  );
  return result.insertId;
};

module.exports = { getAllOrders, getOrderById, deleteById, createOrder };
