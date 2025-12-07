const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'admin'; 

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    const token = jwt.sign(
      { id: newUser.insertId, role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      success: true,
      data: {
        userId: newUser.insertId,
        token,
        photoUrl: ''
      }
    });
  } catch (err) {
    logger.error(`Failed to register user: ${err.message}`);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Missing email or password' });
    }

    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        token,
        photoUrl: user.photo || ''
      }
    });
  } catch (err) {
    logger.error(`Failed to login user ${req.body.email}: ${err.message}`);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const userId = parseInt(req.params.id, 10);
    const photoUrl = `/images/users/${req.file.filename}`;

    await User.updatePhoto(userId, photoUrl);

    return res.status(200).json({
      success: true,
      data: { photoUrl }
    });
  } catch (err) {
    logger.error(`Failed to upload photo for user ${req.params.id}: ${err.message}`);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { register, login, uploadPhoto };
