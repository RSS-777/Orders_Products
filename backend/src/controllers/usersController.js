const User = require('../models/userModel');
const logger = require('../logger');
const path = require('path');
const fs = require('fs');
const DEFAULT_PHOTO = '/images/person_default.png';

const getAllUsers = async (req, res) => {
    try {
        const requestingUser = await User.getById(req.user.id);

        if (!requestingUser)
            return res.status(404).json({ success: false, error: 'User not found' });

        if (requestingUser.role !== 'admin')
            return res.status(403).json({ success: false, error: 'Forbidden' });

        const roleFilter = req.body?.role ?? null;
        const users = roleFilter
            ? await User.getByRole(roleFilter)
            : await User.getAll();

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, error: 'No users found' });
        }

        const formattedUsers = users.map(u => ({
            ...u,
            photo: u.photo || DEFAULT_PHOTO
        }));

        res.status(200).json({ success: true, data: formattedUsers });

    } catch (err) {
        logger.error(`Failed to get all users: ${err.message}`);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

const uploadPhoto = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ success: false, error: 'No file uploaded' });

        const userId = parseInt(req.params.id, 10);

        if (req.user.id !== userId) {
            return res.status(403).json({ success: false, error: 'You can only update your own photo' });
        }

        const user = await User.getById(userId);
        const oldPhoto = user.photo;
        const photoUrl = `/images/users/${req.file.filename}`;

        await User.updatePhoto(userId, photoUrl);

        if (oldPhoto && oldPhoto !== DEFAULT_PHOTO) {
            const oldPhotoPath = path.join(__dirname, '../uploads/users', path.basename(oldPhoto));
            if (fs.existsSync(oldPhotoPath)) fs.unlinkSync(oldPhotoPath);
        }

        res.status(200).json({ success: true, data: { photoUrl } });

    } catch (err) {
        logger.error(`Failed to upload photo: ${err.message}`);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

const deleteMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.getById(userId);
        if (!user)
            return res.status(404).json({ success: false, error: 'User not found' });

        if (user.photo && user.photo !== DEFAULT_PHOTO) {
            const photoPath = path.join(__dirname, '../uploads/users', path.basename(user.photo));
            if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
        }

        await User.deleteById(userId);

        res.status(200).json({ success: true, message: 'Profile deleted successfully' });

    } catch (err) {
        logger.error(`Failed to delete profile: ${err.message}`);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

module.exports = { getAllUsers, uploadPhoto, deleteMyProfile };

