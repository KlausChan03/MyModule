var fs = require("fs");

var config = require("../function/config");

config.readfile();
console.log("HTTP SERVER 启动成功! 监听端口:" + config.get("app").main.httpPort);

