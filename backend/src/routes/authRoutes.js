const express = require('express');
const router = express.Router();
const { login, uploadPhoto } = require('../controllers/authController');
const { uploadUserPhoto } = require('../middlewares/upload');

router.post('/login', login);
router.post('/users/:id/photo', uploadUserPhoto.single('photo'), uploadPhoto);

module.exports = router;
