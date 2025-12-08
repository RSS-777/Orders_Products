const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const { uploadProductPhoto } = require('../middlewares/upload');

router.get('/get',authMiddleware, productController.getProducts);
router.post(
    '/create',
    authMiddleware,
    uploadProductPhoto.single('photo'),
    productController.createProduct
);
router.delete('/:id/delete', authMiddleware, productController.deleteProduct);

module.exports = router;

