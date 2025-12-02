const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password || !name || !role) return res.status(400).json({ message: 'Missing fields' });

  const existingUser = await User.getByEmail(email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ message: 'User created', userId: newUser.insertId });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.getByEmail(email);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

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
