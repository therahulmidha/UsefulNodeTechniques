const orderService = require('../service/orderService');
const log = require('winston');
const config = require('config');
const WSS = require('ws').Server;

module.exports = async function () {
    // Start the server
    let wss = new WSS({ port: config.get('wssPort') }, () => {
        log.info(`WebSocket server started on ws://localhost:${config.get('wssPort')}`);
    });

    // When a connection is established
    wss.on('connection', function (socket) {
        log.info('Opened connection');

        // Send data back to the client
        let json = JSON.stringify({ message: 'Ack from client' });
        socket.send(json);

        // When data is received
        socket.on('message', function (message) {
            log.info('Received: ' + message);
        });

        // The connection was closed
        socket.on('close', function () {
            log.info('Closed Connection');
        });

    });

    // Every three seconds broadcast "{ message: 'Hello hello!' }" to all connected clients
    let broadcast = async function () {


        let orderLengthGreater = await orderService.getOrderLengthInLastMinute();

        let json = {
            orderLengthGreater
        };
        // wss.clients is an array of all connected clients
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(json));
            log.info('Sent: ' + json);
        });
    }

    setInterval(broadcast, config.get('broadcastInterval'));

}
