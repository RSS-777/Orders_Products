const db = require('../db');

const Auth = {
  getByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  create: async ({ name, email, password }) => {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, 'user']
    );
    return result;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  deleteById: async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result;
  }
};

module.exports = Auth;
