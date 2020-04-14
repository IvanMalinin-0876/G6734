'use strict';

var DynamicDataManager = {

    UserItems: {
        find: function(_dynamicdata) {
            let founduseritems;
            founduseritems = _dynamicdata.MessageItems;
            return founduseritems ? founduseritems : null;
        },

        findById: function(_id, _dynamicdata) {
            let useritems, founduseritem, useritem;
            useritems = DynamicDataManager.UserItems.find(_dynamicdata);
            if (useritems) {
                for (let i = 0; i < useritems.length; i++) {
                    useritem = useritems[i];
                    if (useritem.Id == _id) {
                        founduseritem = useritem;
                        return founduseritem;
                    }
                }
            }
            return null;
        }

    },


    MessageItems: {

        find: function(_dynamicdata) {
            let foundmessageitems;
            foundmessageitems = _dynamicdata.MessageItems;
            return foundmessageitems ? foundmessageitems : null;
        },

        findById: function(_id, _dynamicdata) {
            let messageitems, foundmessageitem, messageitem;
            messageitems = DynamicDataManager.messageitems.find(_dynamicdata);
            if (messageitems) {
                for (let i = 0; i < messageitems.length; i++) {
                    messageitem = messageitems[i];
                    if (messageitem.Id == _id) {
                        foundmessageitem = messageitem;
                        return foundmessageitem;
                    }
                }
            }
            return null;
        },

        findByUserId: function(_FromUserId, _dynamicdata) {
            let foundmessageitems, messageitems, messageitem;
            foundmessageitems = [];
            messageitems = DynamicDataManager.messageitems.find(_dynamicdata);
            if (messageitems) {
                for (let i = 0; i < messageitems.length; i++) {
                    messageitem = messageitems[i];
                    if (messageitem.FromUserId == _FromUserId) {
                        foundmessageitems.push(messageitem);
                    }
                }
            }
            return foundmessageitems;
        }

    },



};

module.exports = DynamicDataManager;