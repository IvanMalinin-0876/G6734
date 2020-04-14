'use strict';

var fs = require('fs');

var AdminData = function() {
    let json = fs.readFileSync(__dirname + '/../tea-proto/admin.json', 'utf-8');
    let object = JSON.parse(json);
    return object;
};

module.exports = AdminData;