'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var LogManager = require('../managers/log_manager.js');
var ProtoBufManager = require('../managers/proto_buf_manager.js');

var User = require('../modules/user.js');

var MessageUtil = require('../utils/message_util.js');
var UserUtil = require('../utils/user_util.js');

/*******************************
 * Create additional variables *
 *******************************/

var UserFunction = ProtoBufManager.user().UserFunction;
var UserError = ProtoBufManager.user().UserError;



/**
 * Constructor for class Client
 * param _websocket - web socket for client
 */
var Client = function(_websocket) {
    LogManager.notification('[CLIENT] Connect client.');
    let self, response;
    let client;
    let callback;
    client = this;
    callback = function(_response) {
        client.sendResponse(_response);
    };
    this.Player = null;
    this.WebSocket = _websocket;
    self = this;
    this.WebSocket.on('message', function(_message) {
        self.receiveRequest(_message);
    });
    this.WebSocket.on('close', function() {
        self.disconnect();
    });
    MessageUtil.createOkMessage(callback);
};

/**
 * Receive request from client
 * param _request - request for receive
 */
Client.prototype.receiveRequest = function(_request) {
    LogManager.notification('[CLIENT] Receive request.');
    let message;
    let client;
    let callback;
    client = this;
    callback = function(_response) {
        client.sendResponse(_response);
    };
    try {
        message = ProtoBufManager.decodeMessage(_request);
        this.processMessage(message, callback);
    } catch (_exception) {
        LogManager.error('[CLIENT] ' + _exception);
        MessageUtil.createErrorMessage(callback);
    }
};

/**
 * Process message
 * param _message - message for process
 * param _callback - call back function
 */
Client.prototype.processMessage = function(_message, _callback) {
    LogManager.notification('[CLIENT] Process message.');
    let data, admindata, dynamicdata;
    let client;
    switch (_message.Module) {
        case MessageModule.USER:
            LogManager.notification('[CLIENT] Message has module [USER].');
            if (_message.Data == null) {
                LogManager.error('[CLIENT][USER] Message has error [USER_MISSING_DATA].');
                UserUtil.createErrorMessage(UserFunction.USER_NONE, UserError.USER_MISSING_DATA, _callback);
                return;
            }
            data = _message.Data;
            switch (data.Function) {
                case UserFunction.USER_NONE:
                    LogManager.notification('[CLIENT][USER] Message has function [USER_NONE].');
                    User.none(_callback);
                    return;
                case UserFunction.USER_LOG_IN:
                    LogManager.notification('[CLIENT][USER] Message has function [USER_LOG_IN].');
                    if (this.Player != null) {
                        LogManager.error('[CLIENT][USER][USER_LOG_IN] Message has error [USER_ALREADY_LOG_IN].');
                        UserUtil.createErrorMessage(UserFunction.USER_NONE, UserError.USER_MISSING_DATA, _callback);
                        return;
                    }
                    client = this;
                    User.logIn(data.Login, client, _callback);
                    return;
                case UserFunction.USER_GET_DYNAMIC_DATA:
                    LogManager.notification('[CLIENT][USER] Message has function [USER_GET_DYNAMIC_DATA].');
                    if (this.Player == null) {
                        LogManager.error('[CLIENT][USER][USER_LOG_IN] Message has error [USER_NOT_LOG_IN].');
                        UserUtil.createErrorMessage(UserFunction.USER_LOG_IN, UserError.USER_NOT_LOG_IN, _callback);
                        return;
                    }
                    dynamicdata = this.Player.DynamicData;
                    User.getDynamicData(dynamicdata, _callback);
                    return;
                default:
                    LogManager.notification('[CLIENT][USER] Message has function [].');
                    User.none(_callback);
                    return;
            }
        default:
            LogManager.error('[CLIENT] Message has module [].');
            MessageUtil.createErrorMessage(_callback);
            return;
    }
};

/**
 * Send response to client
 * param _response - response for send
 */
Client.prototype.sendResponse = function(_response) {
    LogManager.notification('[CLIENT] Send response.');
    let message;
    message = ProtoBufManager.encodeMessage(_response);
    this.WebSocket.send(message);
};

/**
 * Disconnect client from server
 */
Client.prototype.disconnect = function() {
    LogManager.notification('[CLIENT] Disconnect client.');
    if (this.Player) {
        this.Player.unsubscribe(this);
        this.Player = null;
    }
    this.WebSocket = null;
};

module.exports = Client;