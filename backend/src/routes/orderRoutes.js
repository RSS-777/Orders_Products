const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');

router.get('/get', authMiddleware, orderController.getOrders);
router.post('/create', authMiddleware, orderController.createOrder);
router.delete('/:id/delete', authMiddleware, orderController.deleteOrder);


module.exports = router;
