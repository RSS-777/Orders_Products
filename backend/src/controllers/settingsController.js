const Settings = require('../models/settingsModel');
const Auth = require('../models/authModel');
const logger = require('../logger');

const getDefaultCurrency = async (req, res) => {
  try {
    const currency = await Settings.getCurrency();
    return res.status(200).json({ success: true, data: { defaultCurrency: currency } });
  } catch (err) {
    logger.error(`Failed to get default currency: ${err.message}`);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const updateDefaultCurrency = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Auth.getById(userId); 
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    const { currency } = req.body;
    if (!currency) {
      return res.status(400).json({ success: false, error: 'Currency is required' });
    }

    const updated = await Settings.updateCurrency(currency);
    if (updated) {
      return res.status(200).json({ success: true, message: 'Default currency updated' });
    } else {
      return res.status(404).json({ success: false, error: 'Setting not found' });
    }

  } catch (err) {
    logger.error(`Failed to set default currency: ${err.message}`);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { getDefaultCurrency, updateDefaultCurrency };
