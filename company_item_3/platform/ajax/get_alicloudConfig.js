var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var mongo = require("../func/mongo.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var txsms = require("../func/txsms.js");
// var rongcloud = require("../func/rongcloud.js");
var moment = require("moment");
var transliteration = require("transliteration");
var sign = require("../func/sign.js");
var fs = require("fs");
var Fiber = require('fibers');
var alioss = require('../func/alioss.js');
// var gm = require('gm');



config.readfile();
var co = require('co');


module.exports.run = function(body, pg, mo) {

    var p = {};
    var f = {};
    body.receive = JSON.parse(body.data);
    f.data = body.receive;
    f.时间 = moment().format('YYYYMMDDHHmmss');
    var conf = config.get("alicloud").阿里云参数1;
    // var client = alioss.init(conf.region, conf.accessKeyId, conf.accessKeySecret);
    console.log(conf)
    
    p.conf = conf;
    p.状态 = "成功";
    
    return common.removenull(p);

}