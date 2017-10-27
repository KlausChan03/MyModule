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
config.readfile();
//var alioss = require('../func/alioss.js');
var co = require('co');
var OSS = require('ali-oss');

module.exports.run = function(body, pg, mo) {
	var p = {};
	body.receive = JSON.parse(body.data);
	var f = body.receive;
	var sql="";
	var add="";
	var client = new OSS({
		region: 'oss-cn-shenzhen',
		accessKeyId: 'LTAIRz4pA6Qeu12D',
		accessKeySecret: 'ZASbh3Xg1RtSo6VxwLnNkSlNvXNMYJ',
		bucket: 'zyk-temp'
	});
	 var ttt = moment().format("YYYYMMDDHHmmss");
     var ran = parseInt(Math.random() * 89999 + 10000);
     var newName = ttt + ran;

	co(function*() {

//      var fiber = Fiber.current;
        var result = yield client.multipartUpload(''+newName+'', '' + f.img_list + '', {
            progress: function*(p) {
                console.log('上传中: ' + (p * 100).toFixed(2) + '%');

            }
        });
        console.log(result)
        add=(result.res.requestUrls)[0].split("?")[0];
        sql = "insert into 外卖黑名单表 (id,类别) values (165,'"+ add+"')";
		 pgdb.query(pg, sql);
    }).catch(function(err) {
        console.log(err);
    });
	
        


}


//
//img_list=E:/apiserver-191升级包5.5/apiserver-191升级包/temp/3004_bgm.png
//名称=2