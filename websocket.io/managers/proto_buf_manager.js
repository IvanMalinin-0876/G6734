"use strict";

/*****************************
 * Import additional modules *
 *****************************/

var Path = require("path");
var ProtoBuf = require("protobufjs");

/*******************************
 * Create additional variables *
 *******************************/

var Builder = ProtoBuf.newBuilder();

var dir = "../proto/Entities";

var ProtoBufManager = {
    /**
     * Get data from protofile
     * param _filename - name of protofile
     * param _package - package of protofile
     */
    protofile: function(_filename, _package) {
        let path = Path.resolve(__dirname, dir, _filename);
        ProtoBuf.loadProtoFile(path, Builder);
        return _package ? Builder.build(_package) : Builder.build();
    },

    /**
     * Get data from protofile 'User.proto'
     */
    userstate: function() {
        return ProtoBufManager.protofile("UserState.proto", "Assets.Entities");
    },
    /**
     * Get data from protofile 'Message.proto'
     */
    message: function() {
        return ProtoBufManager.protofile("Message.proto");
    },
    user: function() {
        return ProtoBufManager.protofile("User.proto", "Assets.Entities");
    },
    /**
     * Get data from protofile 'DynamicData.proto'
     */
    dynamicData: function() {
        return ProtoBufManager.protofile("DynamicData.proto", "Assets.Entities");
    },


    decodestring: function(_string) {
        let newjson, newbase64;
        newbase64 = Base64.decode(_string);
        newjson = JSON.parse(newbase64);
        let vae = "";
        return newjson
    },

    /**
     * Decode message
     * param _message - message for decode
     */
    decodeMessage: function(_message) {

        // {
        //     "Result":1,
        //     "Module":2,
        //     "Data":  "ewogICJSZXN1bHQiOiJPSyIsCiAgIk1vZHVsZSI6IkxPQUQiLAogICJEYXRhIjogIFt7CiAgICAiaWQiOjEKICB9XQogIH0=" 
        //     }
        //  Data - base64


        let MessageModule = ProtoBufManager.message().MessageModule;
        let Message = ProtoBufManager.message().Message_Proto;
        let data;
        let Rdata;
        try {

            data = JSON.parse(_message);
            switch (data.Module) {
                case MessageModule.NONE:
                    break;
                case MessageModule.LOAD:
                    Rdata = ProtoBufManager.decodestring(data.Data);

                    break;
                case MessageModule.WRITE:

                    break;
                case MessageModule.DELETE:

                    break;
                case MessageModule.LOGIN:

                    break;
                default:
                    break;
            }
        } catch (_exception) {
            throw {
                Module: MessageModule.NONE,
            };
        }
        return data;
    },

    /**
     * Encode message
     * param _message - message for encode
     */
    encodeMessage: function(_message) {
        let MessageModule = ProtoBufManager.message().MessageModule;
        let Message = ProtoBufManager.message().Message_Proto;
        let result;
        result = {};
        result.Result = _message.Result;
        result.Module = _message.Module;
        switch (_message.Module) {
            case MessageModule.NONE:
                break;
            case MessageModule.USERSTATE:
                result.Data = ProtoBufManager.userstate().UserState_Proto.encode(
                    _message.Data
                );
                break;
            default:
                break;
        }
        result = Message.encode(result).toBuffer();
        return result;
    },
};

module.exports = ProtoBufManager;