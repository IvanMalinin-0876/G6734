'use strict';

var fs = require('fs');

var DynamicData = function() {
    let json = fs.readFileSync(__dirname + '/../tea-proto/dynamic.json', 'utf-8');
    let object = JSON.parse(json);
    return object;
};

module.exports = DynamicData;