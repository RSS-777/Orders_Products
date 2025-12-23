const multer = require('multer');
const path = require('path');
const fs = require('fs');

const allowedTypes = [
  'image/jpeg', 
  'image/png',    
  'image/gif',    
];

const limits = {
  fileSize: 2 * 1024 * 1024, 
};

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported image format'), false);
  }
};

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

const uploadUserPhoto = multer({ storage: storage('users'), fileFilter, limits });
const uploadProductPhoto = multer({ storage: storage('products'), fileFilter, limits });

module.exports = { uploadUserPhoto, uploadProductPhoto };

