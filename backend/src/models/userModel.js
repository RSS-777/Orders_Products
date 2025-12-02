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
  updatePhoto: async (id, photoUrl) => {
    const [result] = await db.query('UPDATE users SET photo = ? WHERE id = ?', [photoUrl, id]);
    return result;
  },
};

module.exports = User;