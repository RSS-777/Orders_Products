const db = require('../db');
const DEFAULT_PHOTO = '/images/default.png';

const parseJSONSafe = (value) => {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
};

const getAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows.map(p => ({
    ...p,
    photo: p.photo || DEFAULT_PHOTO,
    guarantee: parseJSONSafe(p.guarantee_json),
    price: parseJSONSafe(p.price_json) || []
  }));
};

const getProductsByOrderId = async (orderId) => {
  const [rows] = await db.query('SELECT * FROM products WHERE order_id = ?', [orderId]);
  return rows.map(p => ({
    ...p,
    photo: p.photo || DEFAULT_PHOTO,
    guarantee: parseJSONSafe(p.guarantee_json),
    price: parseJSONSafe(p.price_json) || []
  }));
};

const getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
};

const create = async ({ serialNumber, owner, date, status, title, type, specification, order_id, guarantee, price, isNew, photoUrl }) => {

  const [result] = await db.query(
    `INSERT INTO products 
    (serialNumber, date, owner, status, title, type, specification, order_id, guarantee_json, price_json, isNew, photo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      serialNumber,
      date,
      owner,
      status,
      title,
      type,
      specification,
      order_id,
      guarantee,
      price,
      isNew,
      photoUrl || null
    ]
  );

  return result.insertId;
};

const deleteById = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = { getAllProducts, getProductsByOrderId, create, getById, deleteById };