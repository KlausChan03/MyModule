var cipher = require("../func/cipher.js");
var Fiber = require("fibers");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var mongo = require("../func/mongo.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var txsms = require("../func/txsms.js");
var moment = require("moment");
var fs = require("fs");
var Fiber = require('fibers');
// 引入模块
var COS = require('cos-nodejs-sdk-v5');
config.readfile();

module.exports.run = function (body, pg, mo) {
    body.receive = JSON.parse(body.data);

    var p = {};
    var f = {};
    var conf = config.get("alicloud").腾讯云参数;
    f.data = body.receive;
    console.log(f.data)
    f.时间 = moment().format('YYYYMMDDHHmmss');
    var cos = new COS({
        AppId: conf.AppId,
        SecretId: conf.SecretId,
        SecretKey: conf.SecretKey,
    });


    // 生成随机数
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }
    f.fileName = f.时间 + generateMixed(4);
    var fiber = Fiber.current;
    // 分片上传

    cos.sliceUploadFile({
        Bucket: conf.Bucket,
        Region: conf.Region,
        Key: f.fileName,
        FilePath: f.data.img_list
    }, function (err, data) {
        console.log(err, data);
        console.log(data.Location);
        p.地址 = data.Location;
        fiber.run();

    });
    Fiber.yield();

    p.状态 = "上传成功";

    return common.removenull(p);

}