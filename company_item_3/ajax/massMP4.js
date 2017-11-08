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


config.readfile();
var co = require('co');


module.exports.run = function(body, pg, mo) {
    var p = {};
    var f = {};
    body.receive = JSON.parse(body.data);
    f.data = body.receive;
    //f.session = body.session;

    f.时间 = moment().format('YYYYMMDDHHmmss');
    var conf = config.get("alicloud").阿里云参数1;
    var client = alioss.init(conf.region, conf.accessKeyId, conf.accessKeySecret);
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
    var data = {};
    var timeArr = [];
    co(function*() {
        client.useBucket('zyk-temp');

        data.result = yield client.multipartUpload(f.fileName, f.data.img_list, {
            progress: function*(p) {
                console.log('上传中: ' + (p * 100).toFixed(2) + '%');
                timeArr = (p * 100).toFixed(2);
                // console.log(timeArr)
                // body.session.progress = timeArr;

            }
        });
        fiber.run();
        return data;
    }).catch(function(err) {
        console.log(err);
    });
    Fiber.yield();
    var 信息 = data.result;
    console.log(信息)
    if (信息.res.status == 200 || 信息.res.statusCode == 200) {
        f.状态 = '上传成功';
    } else {
        f.状态 = '上传失败';
    }



    p.状态 = f.状态;
    p.name = 信息.name;
    p.上传时间 = timeArr;
    p.地址 = (信息.res.requestUrls)[0].split("?")[0];
    return common.removenull(p);

}