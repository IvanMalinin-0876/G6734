'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var Moment = require('moment');

var DynamicDataManager = require('../managers/dynamic_data_manager.js');
var DatabaseManager = require('../managers/database_manager.js');
var LogManager = require('../managers/log_manager.js');
var ProtoBufManager = require('../managers/proto_buf_manager.js');


/*******************************
 * Create additional variables *
 *******************************/

// var UserFunction = ProtoBufManager.user().UserFunction;
// var UserError = ProtoBufManager.user().UserError;



var User = {

    /**
     * None function for user module
     * param _callback - call back
     */
    none: function(_callback) {
        LogManager.error('[USER][USER_NONE] Message has error [USER_INCORRECT_FUNCTION].');
        UserUtil.createErrorMessage(UserFunction.USER_NONE, UserError.USER_INCORRECT_FUNCTION, _callback);
    },

    /**
     * Log in function for user module
     * param _login - login of user
     * param _client - client
     * param _callback - call back
     */
    logIn: function(_login, _client, _callback) {
        let player;
        if (_login == null) {
            LogManager.error('[USER][USER_LOG_IN] Message has error [USER_MISSING_DATA].');
            UserUtil.createErrorMessage(UserFunction.USER_LOG_IN, UserError.USER_MISSING_DATA, _callback);
            return;
        }
        player = PlayerManager.find(_login);
        if (player == null) {
            let admindata = DatabaseManager.AdminData.get();
            let dynamicdata = DatabaseManager.DynamicData.create(_login);
            player = new Player(_login, admindata, dynamicdata);
            PlayerManager.add(player);
        }
        if (!player.subscribe(_client)) {
            LogManager.error('[USER][USER_LOG_IN] Message has error [USER_ANOTHER_DEVICE_LOG_IN].');
            UserUtil.createErrorMessage(UserFunction.USER_LOG_IN, UserError.USER_ANOTHER_DEVICE_LOG_IN, _callback);
            return;
        }

        _client.Player = player;
        let playerdataitem = DynamicDataManager.PlayerDataItem.find(player.DynamicData);
        playerdataitem.SessionsCounter++;
        if (playerdataitem.CohortDay == "") {
            playerdataitem.CohortDay = Moment().format('YYYYMMDD');
        }

        UserUtil.createOkMessage(UserFunction.USER_LOG_IN, _login, null, _callback);
        // TODO - save change to database
    },

    /**
     * Get dynamic data function for user module
     * param _dynamicdata - dynamic data
     * param _callback - call back
     */
    getDynamicData: function(_dynamicdata, _callback) {
        let dynamicdata;
        dynamicdata = UserUtil.getDynamicData(_dynamicdata);

        UserUtil.createOkMessage(UserFunction.USER_GET_DYNAMIC_DATA, null, dynamicdata, _callback);
        // TODO - save change to database
    }

};

module.exports = User;