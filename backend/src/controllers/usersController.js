const User = require('../models/userModel');
const logger = require('../logger');
const path = require('path');
const fs = require('fs');
const DEFAULT_PHOTO = '/images/person_default.png';

const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

     const userId = req.user.id;

    const user = await User.getById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const oldPhoto = user.photoUrl;
    const photoUrl = `/uploads/users/${req.file.filename}`;

    await User.updatePhoto(userId, photoUrl);

    if (oldPhoto && oldPhoto !== DEFAULT_PHOTO) {
      const oldPhotoPath = path.join(__dirname, '../uploads/users', path.basename(oldPhoto));
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    return res.status(200).json({ success: true, data: { photoUrl } });

  } catch (err) {
    logger.error(`Failed to upload photo: ${err.message}`);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { uploadPhoto };
