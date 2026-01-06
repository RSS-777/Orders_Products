const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');
const { uploadProductPhoto } = require('../middlewares/upload');

router.get('/get', authMiddleware, allowRoles('admin', 'manager', 'viewer'), productController.getProducts);
router.post(
    '/create',
    authMiddleware,
    allowRoles('admin', 'manager'),
    uploadProductPhoto.single('photo'),
    productController.createProduct
);
router.delete('/:id/delete', authMiddleware, allowRoles('admin'), productController.deleteProduct);

module.exports = router;

