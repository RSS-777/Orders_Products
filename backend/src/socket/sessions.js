const logger = require('../logger');

let activeSessions = 0;

module.exports = function (io) {
    io.on('connection', (socket) => {
        activeSessions++;
        logger.info({ event: 'user_connected', activeSessions });

        io.emit('updateSessions', activeSessions);

        socket.on('disconnect', () => {
            activeSessions--;
            logger.info({ event: 'user_disconnected', activeSessions });
            io.emit('updateSessions', activeSessions);
        });
    });
};
