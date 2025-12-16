const db = require('../db.js');

const Settings = {
    getCurrency: async () => {
        const [rows] = await db.query(
            "SELECT value FROM settings WHERE `key` = 'default_currency' LIMIT 1"
        );
        return rows[0]?.value || null;
    },
    updateCurrency: async (currency) => {
        const [result] = await db.query(
            "UPDATE settings SET value = ? WHERE `key` = 'default_currency'",
            [currency]
        );
        return result.affectedRows;
    },
};

module.exports = Settings;
