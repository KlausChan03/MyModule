var Fiber = require("fibers");
var fs = require("fs");
var query = require("../function/mysql.js");

var ajax = {};

ajax.index = function(req, res, body) {
  var obj = new Object();

  var fiber = Fiber(function(cb) {
    query.start(obj.mysql);
    var func = require("./" + body.func + ".js");
    body.send = func.run(body, obj.mysql);
    query.end(obj.mysql);

    cb(null, "");
  });
};

ajax.searchfile = function(fileName) {
  var files = fs.readdirSync(__dirname);
  for (var i = 0; i < files.length; i++) {
    if (files[i] == fileName + ".js") {
      console.log(fileName);
      return true;
    }
  }

  return false;
};

module.exports = ajax;
