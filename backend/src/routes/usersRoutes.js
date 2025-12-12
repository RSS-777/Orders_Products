const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const { uploadUserPhoto } = require('../middlewares/upload');

const { uploadPhoto } = require('../controllers/usersController');

router.patch('/:id/photo', authMiddleware, uploadUserPhoto.single('photo'), uploadPhoto);

module.exports = router;