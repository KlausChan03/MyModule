var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var mysql = require("../func/mysql.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var fs = require("fs");

config.readfile();

module.exports.run = function(body,pg, my) {
    var [p,f,sql,result] = [{},{},"",""];
        
    body.receive = JSON.parse(body.data);
    f.data = body.receive[0];

    sql = 'SELECT * FROM 分_分公司表 WHERE id = 1847';
    result = mysql.query(my, sql)

    p.data = result;
    return p;
    
};
