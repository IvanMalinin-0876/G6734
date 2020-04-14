'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var WebSocket = require('ws');

var LogManager = require('./managers/log_manager.js');

var Client = require('./classes/client.js');



LogManager.notification('[SERVER] Load database.');
// TODO - load data from database

LogManager.notification('[SERVER] Start server.');
var server = new WebSocket.Server({ port: 5000 }); //8080
if (!server) {
    LogManager.error('[SERVER] Stop server.');
    proccess.exit();
}

server.on('connection', function(_websocket) {
    new Client(_websocket);
});