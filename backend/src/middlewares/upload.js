const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads', folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const uploadUserPhoto = multer({ storage: storage('users') });
const uploadProductPhoto = multer({ storage: storage('products') });

module.exports = { uploadUserPhoto, uploadProductPhoto };
