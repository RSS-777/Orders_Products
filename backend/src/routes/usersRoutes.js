const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const { uploadUserPhoto } = require('../middlewares/upload');
const allowRoles = require('../middlewares/roleMiddleware');
const { uploadPhoto } = require('../controllers/usersController');

router.patch('/photo', authMiddleware, allowRoles('admin', 'manager'), uploadUserPhoto.single('photo'), uploadPhoto);

module.exports = router;