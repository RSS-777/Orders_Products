const express = require('express');
const router = express.Router();
const { register, login, uploadPhoto } = require('../controllers/authController');
const { uploadUserPhoto } = require('../middlewares/upload');

router.post('/register', register);
router.post('/login', login);
router.post('/users/:id/photo', uploadUserPhoto.single('photo'), uploadPhoto);

module.exports = router;
