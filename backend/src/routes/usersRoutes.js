const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const { uploadUserPhoto } = require('../middlewares/upload');

const { uploadPhoto, getAllUsers, deleteMyProfile } = require('../controllers/usersController');

router.post('/:id/photo', authMiddleware, uploadUserPhoto.single('photo'), uploadPhoto);
router.post('/getUsers', authMiddleware, getAllUsers);
router.delete('/deleteMyProfile', authMiddleware, deleteMyProfile);

module.exports = router;