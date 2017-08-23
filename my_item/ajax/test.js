
var cipher = require('../func/cipher.js');
var config = require('../func/config.js');
var share = require('./public/share.js');
var common = require('../func/common.js');
var request = require('../func/request.js');
var txsms = require('../func/txsms.js');
var moment = require("moment");
var sign = require('../func/sign.js');
var transliteration = require('transliteration');
var fs = require('fs');
var mysql = require('mysql');

module.exports.run = function(body, pg, mo) {
	var server = config.get('server');
	var p = {};
	var data = {};
	p.状态 = "成功";
	body.receive = JSON.parse(body.data);
	var f = body.receive;
	var sql = "";

	//创建一个connection
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'roger',
	});

	//创建一个connection
	connection.connect(function(err) {
		if(err) {
			console.log('[query] - :' + err);
			return;
		}
		console.log('[connection connect]  succeed!');
	});

	sql = "select id,账号 from 分_分公司表  where 1=1"
	//查
	connection.query(sql, function(err, result) {
		if(err) {
			console.log('[SELECT ERROR] - ', err.message);
			p.状态 = '呵呵';
			return p;
		}
		p.状态 = "成功";
		return p;
		console.log('--------------------------SELECT----------------------------');
		console.log(result);
		console.log('------------------------------------------------------------\n\n');
	});
	var result = p;
	return common.removenull(result);

}