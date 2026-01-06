const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');
const allowRoles = require("../middlewares/roleMiddleware");

router.get('/get', authMiddleware, allowRoles('admin', 'manager', 'viewer'), orderController.getOrders);
router.post('/create', authMiddleware, allowRoles('admin', 'manager'), orderController.createOrder);
router.delete('/:id/delete', authMiddleware, allowRoles('admin'), orderController.deleteOrder);

module.exports = router;
