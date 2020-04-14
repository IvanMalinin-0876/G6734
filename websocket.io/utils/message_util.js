'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var ProtoBufManager = require('../managers/proto_buf_manager.js');

/*******************************
 * Create additional variables *
 *******************************/

var MessageResult = ProtoBufManager.message().MessageResult;
var MessageModule = ProtoBufManager.message().MessageModule;



var MessageUtil = {

    /**
     * Create ok message without module
     */
    createOkMessage: function(_callback) {
        let okmessage;
        okmessage = {
            Result: MessageResult.OK,
            Module: MessageModule.NONE,
        };
        return _callback(okmessage);
    },

    /**
     * Create error message without module
     */
    createErrorMessage: function(_callback) {
        let errormessage;
        errormessage = {
            Result: MessageResult.ERROR,
            Module: MessageModule.NONE,
        };
        return _callback(errormessage);
    }

};

module.exports = MessageUtil;