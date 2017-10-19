var express = require("express");
var mysql = require("mysql");
var query = require("../function/mysql.js");
var ajax = require("./ajax.js");

module.exports.run = function(body, req, res) {
  // res.setHeader("Content-Type", "application/json;charset=utf-8");
  console.log("llll");
  var p = {};
  p.状态 = "成功";
  p.数据 = "";
  var sql = "select id,账号,股数 from 分_分公司表  where 1=1";
  query(sql, function(err, vals, fields) {
    console.log(vals);
    p.数据 = vals;
    // p.数据 = JSON.parse(vals);
    res.send(p);
  });
};
