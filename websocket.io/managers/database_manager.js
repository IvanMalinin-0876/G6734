'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var DefaultAdminData = require('../test/ad.js');
var DefaultDynamicData = require('../test/dd.js');



var DatabaseManager = {

    AdminData: {

        get: function() {
            return new DefaultAdminData();
        }

    },

    DynamicData: {

        create: function(_login) {
            return new DefaultDynamicData();
        },

        get: function(_login) {

        },

        delete: function(_login) {

        }

    }

};

module.exports = DatabaseManager;