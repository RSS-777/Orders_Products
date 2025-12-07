const db = require('../db');

const DEFAULT_PHOTO = '/images/default.png';

const getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows.map(p => ({
    ...p,
    photo: p.photo || DEFAULT_PHOTO,
    guarantee: p.guarantee_json ? JSON.parse(p.guarantee_json) : null,
    price: p.price_json ? JSON.parse(p.price_json) : []
  }));
};

const getProductsByOrderId = async (orderId) => {
  const [rows] = await db.query('SELECT * FROM products WHERE order_id = ?', [orderId]);
  return rows.map(p => ({
    ...p,
    photo: p.photo || DEFAULT_PHOTO,
    guarantee: p.guarantee_json ? JSON.parse(p.guarantee_json) : null,
    price: p.price_json ? JSON.parse(p.price_json) : []
  }));
};

const create = async ({ name, price, description, photo, guarantee }) => {
  const guarantee_json = guarantee ? JSON.stringify(guarantee) : null;
  const price_json = price ? JSON.stringify(price) : null;
  const [result] = await db.query(
    'INSERT INTO products (name, description, photo, guarantee_json, price_json) VALUES (?, ?, ?, ?, ?)',
    [name, description, photo || null, guarantee_json, price_json]
  );
  return {
    id: result.insertId,
    name,
    description,
    photo: photo || DEFAULT_PHOTO,
    guarantee,
    price
  };
};

const deleteById = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = { getAllProducts, getProductsByOrderId, create, deleteById };

