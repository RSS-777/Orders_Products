const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await User.getAll();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token, userId: user.id, photoUrl: user.photo });
};

const uploadPhoto = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const userId = req.params.id;
  const photoUrl = `/images/users/${req.file.filename}`;

  await User.updatePhoto(userId, photoUrl);
  res.json({ success: true, data: { photoUrl } });
};

module.exports = { login, uploadPhoto };
