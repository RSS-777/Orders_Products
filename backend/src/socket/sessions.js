const logger = require('../logger');

let activeSessions = 0;

module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.emit('updateSessions', activeSessions);

        activeSessions++;
        io.emit('updateSessions', activeSessions);

        socket.on('requestSessions', () => {
            socket.emit('updateSessions', activeSessions);
        });
        
        socket.on('disconnect', () => {
            activeSessions--;
            io.emit('updateSessions', activeSessions);
        });
    });

};




