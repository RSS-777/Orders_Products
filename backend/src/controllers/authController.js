const Auth = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

const DEFAULT_PHOTO = '/images/person_default.png';

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'admin';

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }

    const existingUser = await Auth.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Auth.create({ name, email, password: hashedPassword, role });

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

    const user = await Auth.getByEmail(email);
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

    const photoUrl = user.photoUrl || DEFAULT_PHOTO;

    return res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        token,
        photoUrl
      }
    });
  } catch (err) {
    logger.error(`Failed to login user ${req.body.email}: ${err.message}`);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { register, login };
