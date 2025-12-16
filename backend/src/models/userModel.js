const db = require('../db');

const User = {
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  updatePhoto: async (id, photoUrl) => {
    const [result] = await db.query(
      'UPDATE users SET photoUrl = ? WHERE id = ?',
      [photoUrl, id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = User;

