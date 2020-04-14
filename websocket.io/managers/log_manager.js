'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var Moment = require('moment');



var LogManager = {

    /**
     * Write notification to log
     * param _message - message for output notification
     */
    notification: function(_message) {
        console.log('[' + new Moment().format('HH:mm:ss') + '] NN: ' + _message);
    },

    /**
     * Write warning to log
     * param _message - message for output warning
     */
    warning: function(_message) {
        console.log('[' + new Moment().format('HH:mm:ss') + '] WW: ' + _message);
    },

    /**
     * Write error to log
     * param _message - message for output error
     */
    error: function(_message) {
        console.log('[' + new Moment().format('HH:mm:ss') + '] EE: ' + _message);
    }

};

module.exports = LogManager;