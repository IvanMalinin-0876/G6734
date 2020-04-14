'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var LogManager = require('../managers/log_manager.js');



/**
 * Constructor for class Player
 * param _login - login for new player
 * param _admindata - admin data
 * param _dynamicdata - dynamic data
 */
var Player = function(_login, _admindata, _dynamicdata) {
    this.Client = null;
    this.Login = _login;
    this.AdminData = _admindata;
    this.DynamicData = _dynamicdata;
};

/**
 * Subscribe client to player
 * param _client - client for subscribe
 */
Player.prototype.subscribe = function(_client) {
    if (this.Client == null) {
        this.Client = _client;
        return true;
    }
    return false;
};

/**
 * Unsubscribe client from player
 * parma _client - client for unsibscribe
 */
Player.prototype.unsubscribe = function(_client) {
    if (this.Client == _client) {
        this.Client = null;
        return true;
    }
    return false;
};

module.exports = Player;