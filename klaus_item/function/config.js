var fs = require("fs");
var cache = require("memory-cache");

var config = {};

//更新缓存
config.readfile = function() {
  var dir = "./config/";
  // console.log(dir, "1");
  var files = fs.readdirSync(dir);
  // console.log(files, "2");

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file.substring(file.length - 5, file.length) == ".json") {
      var path = dir + file;
      // console.log(path, "3");

      var config = fs.readFileSync(path);
      try {
        var json = JSON.parse(config.toString());
        var key = "config/" + file.substring(0, file.length - 5);
        console.log(key)
        cache.put(key, json);
      } catch (e) {
        console.error("读取配置文件出错误！！");
      }
    }
  }

  console.log("读取配置成功!");
};

//获取缓存
config.get = function(key) {
  return cache.get("config/" + key);
};

//设置缓存
config.set = function(key, obj) {
  try {
    cache.put("config/" + key, obj);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = config;
