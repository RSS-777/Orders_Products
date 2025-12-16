const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const settingsController = require('../controllers/settingsController');

router.get('/currency', authMiddleware, settingsController.getDefaultCurrency);
router.put('/currency', authMiddleware, settingsController.updateDefaultCurrency);

module.exports = router;
