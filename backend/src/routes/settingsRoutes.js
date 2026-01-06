const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const settingsController = require('../controllers/settingsController');
const allowRoles = require('../middlewares/roleMiddleware');

router.get('/currency', authMiddleware, allowRoles('admin', 'manager', 'viewer'), settingsController.getDefaultCurrency);
router.put('/currency', authMiddleware, allowRoles('admin', 'manager'), settingsController.updateDefaultCurrency);

module.exports = router;
