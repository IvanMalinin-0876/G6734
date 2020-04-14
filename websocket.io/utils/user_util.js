'use strict';

/*****************************
 * Import additional modules *
 *****************************/

var DynamicDataManager = require('../managers/dynamic_data_manager.js');
var ProtoBufManager = require('../managers/proto_buf_manager.js');

/*******************************
 * Create additional variables *
 *******************************/

var MessageResult = ProtoBufManager.message().MessageResult;
var MessageModule = ProtoBufManager.message().MessageModule;



var UserUtil = {

    /**
     * Create ok message with user module
     * param _function - function for message
     * param _login - login of user
     * param _dynamicdata - dynamic data
     * param _callback - call back
     */
    createOkMessage: function(_function, _login, _dynamicdata, _callback) {
        let okmessage;
        okmessage = {
            Result: MessageResult.OK,
            Module: MessageModule.USER,
            Data: {
                Function: _function,
                Login: _login,
                DynamicData: _dynamicdata
            }
        };
        _callback(okmessage);
    },

    /**
     * Create error message with user module
     * param _function - function for message
     * param _error - error for message
     * param _callback - call back
     */
    createErrorMessage: function(_function, _error, _callback) {
        let errormessage;
        errormessage = {
            Result: MessageResult.ERROR,
            Module: MessageModule.USER,
            Data: {
                Function: _function,
                Error: _error
            }
        };
        _callback(errormessage);
    },

    /**
     * Get dynamic data for current tutorial stage
     * param _dynamicdata - dynamic data
     */
    getDynamicData: function(_dynamicdata) {
        let dynamicdata;
        let playerdataitem;
        // playerdataitem = DynamicDataManager.PlayerDataItem.find(_dynamicdata);
        // dynamicdata = {};
        // if (playerdataitem.TutorialStage > 6) {
        //     dynamicdata.AchievementItems = _dynamicdata.AchievementItems;
        //     dynamicdata.AchievementRoomItem = _dynamicdata.AchievementRoomItem;
        //     dynamicdata.AltarItem = _dynamicdata.AltarItem;
        //     dynamicdata.AltarOrderCellItems = _dynamicdata.AltarOrderCellItems;
        //     dynamicdata.AltarRewardCellItems = _dynamicdata.AltarRewardCellItems;
        // }
        // dynamicdata.BedItems = [];
        // _dynamicdata.BedItems.forEach(function(_beditem) {
        //     if (playerdataitem.TutorialStage > 6 && _beditem.Type < 2000 ||
        //         playerdataitem.TutorialStage <= 6 && _beditem.Type >= 2000) {
        //         this.push(_beditem);
        //     }
        // }, dynamicdata.BedItems);
        // dynamicdata.CharacterItems = [];
        // _dynamicdata.CharacterItems.forEach(function(_characteritem) {
        //     if (playerdataitem.TutorialStage > 6 && _characteritem.Type < 2000 ||
        //         playerdataitem.TutorialStage <= 6 && _characteritem.Type >= 2000) {
        //         this.push(_characteritem);
        //     }
        // }, dynamicdata.CharacterItems);
        // if (playerdataitem.TutorialStage > 6) {
        //     dynamicdata.ChestItems = _dynamicdata.ChestItems;
        //     dynamicdata.CraftItems = _dynamicdata.CraftItems;
        //     dynamicdata.DecorationItems = _dynamicdata.DecorationItems;
        //     dynamicdata.FortuneWheelItem = _dynamicdata.FortuneWheelItem;
        //     dynamicdata.FortuneWheelCellItems = _dynamicdata.FortuneWheelCellItems;
        //     dynamicdata.GarbageItems = _dynamicdata.GarbageItems;
        //     dynamicdata.KinoRoomItem = _dynamicdata.KinoRoomItem;
        //     dynamicdata.LaboratoryItem = _dynamicdata.LaboratoryItem;
        //     dynamicdata.LibraryItem = _dynamicdata.LibraryItem;
        //     dynamicdata.LightTempleItem = _dynamicdata.LightTempleItem;
        //     dynamicdata.LocationItems = _dynamicdata.LocationItems;
        //     dynamicdata.LocationPointItems = _dynamicdata.LocationPointItems;
        // }
        // dynamicdata.ManufactureItems = [];
        // _dynamicdata.ManufactureItems.forEach(function(_manufactureitem) {
        //     if (playerdataitem.TutorialStage > 6 && _manufactureitem.Type < 2000 ||
        //         playerdataitem.TutorialStage <= 6 && _manufactureitem.Type >= 2000) {
        //         this.push(_manufactureitem);
        //     }
        // }, dynamicdata.ManufactureItems);
        // if (playerdataitem.TutorialStage > 6) {
        //     dynamicdata.MarketItem = _dynamicdata.MarketItem;
        //     dynamicdata.OrderTreeItem = _dynamicdata.OrderTreeItem;
        //     dynamicdata.OrderTreeCellItems = _dynamicdata.OrderTreeCellItems;
        //     dynamicdata.OrderItems = _dynamicdata.OrderItems;
        //     dynamicdata.PlantItems = _dynamicdata.PlantItems;
        //     dynamicdata.PlantationItems = _dynamicdata.PlantationItems;
        // }
        // dynamicdata.PlayerDataItem = _dynamicdata.PlayerDataItem;
        // if (playerdataitem.TutorialStage > 6) {
        //     dynamicdata.QuestItems = _dynamicdata.QuestItems;
        // }
        // dynamicdata.ResourceItems = [];
        // _dynamicdata.ResourceItems.forEach(function(_resourceitem) {
        //     if (playerdataitem.TutorialStage > 6 && _resourceitem.Type < 2000 ||
        //         playerdataitem.TutorialStage <= 6 && _resourceitem.Type >= 1000) {
        //         this.push(_resourceitem);
        //     }
        // }, dynamicdata.ResourceItems);
        // dynamicdata.ResourceStorageItems = [];
        // _dynamicdata.ResourceStorageItems.forEach(function(_resourcestorageitem) {
        //     if (playerdataitem.TutorialStage > 6 && _resourcestorageitem.Type < 2000 ||
        //         playerdataitem.TutorialStage <= 6 && _resourcestorageitem.Type >= 2000) {
        //         this.push(_resourcestorageitem);
        //     }
        // }, dynamicdata.ResourceStorageItems);
        // if (playerdataitem.TutorialStage > 6) {
        //     dynamicdata.RoadsideShopItem = _dynamicdata.RoadsideShopItem;
        //     dynamicdata.ShopElementItems = _dynamicdata.ShopElementItems;
        //     dynamicdata.TeaItems = _dynamicdata.TeaItems;
        //     dynamicdata.TeaChipItems = _dynamicdata.TeaChipItems;
        //     dynamicdata.TeaHouseItems = _dynamicdata.TeaHouseItems;
        //     dynamicdata.TotemItems = _dynamicdata.TotemItems;
        // }
        // dynamicdata.ZoneItems = [];
        // _dynamicdata.ZoneItems.forEach(function(_zoneitem) {
        //     if (playerdataitem.TutorialStage > 6 && _zoneitem.Type < 2000 ||
        //         playerdataitem.TutorialStage <= 6 && _zoneitem.Type >= 2000) {
        //         this.push(_zoneitem);
        //     }
        // }, dynamicdata.ZoneItems);
        return dynamicdata;
    }

};

module.exports = UserUtil;