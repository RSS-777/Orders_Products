const db = require('./db');

const User = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  getByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  create: async ({ name, email, password, role }) => {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return result;
  },
  updatePhoto: async (id, photoUrl) => {
    const [result] = await db.query('UPDATE users SET photo = ? WHERE id = ?', [photoUrl, id]);
    return result;
  }
};

module.exports = User;
