"use strict";


// 新方法实现数据渲染
layui.use(['table','form'],function() {
  var table = layui.table;
  var form=layui.form;
  var $ = layui.jquery;
  var ifarme_func = window.top.document.getElementsByClassName("iframe_");
  
  //查表编号相当于获取表的验证码
  var tb_id = GetRequest(ifarme_func).bc_id;
 
  
  var data={};
  //存数据
  data.field = "";
  //验证表名
  data.tb_id = tb_id;
  var obj_save = { datas: [data.field,data.tb_id], func: GetRequest(ifarme_func).func };
  console.log(obj_save)

  var success_func = function(res) {
    // 数据处理
     var resAll=res;
		 changeTableStutas(resAll)

    
    /**
     * 单条查询10/21 zhou
     */
    $("#seacherButton").on("click",function(){
    	//获取查询的字段
    	  var syllable=$(".layui-select-title input").val();
    	 //获取到查询字段的值
    	  var syllableVal=$("#souVal").val();
    	  var data={};
    	  //把以上两个字段的值传给后台
			  data.field = [syllable,syllableVal];
			  data.tb_id = tb_id;
    	  var obj_save = { datas: [data.field,data.tb_id], func: GetRequest(ifarme_func).func };
    	  console.log(obj_save)
    	  var success_func=function(res){
    	  	  // 生成表格
    	  var resSingle=res;
			  changeTableStutas(resSingle)
			 }
    	  ajax.ajax_common(obj_save, success_func);
    })
    

    //表格内功能工具条
    table.on("tool(demo)", function(obj) {
      //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data, //获得当前行数据
        layEvent = obj.event; //获得 lay-event 对应的值
      switch (layEvent) {
        case "detail":
          layer.msg("查看操作");
          break;
        case "del":
          layer.confirm("确认删除该数据？", function(index) {
            var select_id = data.id;
            table_act.delete(res, tb_id, select_id);  
            obj.del(); //删除对应行（tr）的DOM结构
            layer.close(index);
          });
          break;
        case "edit":
          table_act.update(res, tb_id, data);
          break;
      }
    });

    

    //表格外功能工具条
    var active = {
      getCheckData: function() {
        var checkStatus = table.checkStatus("test"),
          data = checkStatus.data;
        layer.alert(JSON.stringify(data));
      },
      getCheckLength: function() {
        var checkStatus = table.checkStatus("test"),
          data = checkStatus.data;
        layer.msg("选中了：" + data.length + " 个");
      },
      isAll: function() {},
      parseTable: function() {
        table.init("parse-table-demo");
      },
      insertData: function() {
        table_act.insert(res, tb_id);
      },
      updateData: function() {
        table_act.update(res, tb_id, data);
      }
    };

    $(".layui-btn").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });
  };
  
  ajax.ajax_common(obj_save, success_func);
});

var table_act = {};
// 删除功能
table_act.delete = function(res, tb_id, select_id){
var data={};
data.tb_id = tb_id;
data.select_id = {"id":select_id};
var obj_save = { datas: [data.select_id, data.tb_id], func: "BC_delete" };
var success_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
var error_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
ajax.ajax_common(obj_save, success_func, error_func);
}
// 新增功能
table_act.insert = function(res, tb_id) {
var test_arr = [];
for (i in res.列表[0]) {
    test_arr.push(i);
}
var test = "";
test_arr.pop();
for (var i = 0; i < test_arr.length; i++) {
    test +=
      '<div class="layui-form-item"><label class="layui-form-label">' +
      test_arr[i] +
      '</label> <div class="layui-input-block"> <input type="text" name="' +
      test_arr[i] +
      '"   placeholder="请输入' +
      test_arr[i] +
      '" autocomplete="off" class="layui-input insert-input"> </div> </div>';
}

var success_func = function() {
    $("*[name='id']").attr("disabled", "true");

    layui.use("form", function() {
      var form = layui.form;
      // console.log(tb_id)
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        var obj_save = { datas: [data.field, data.tb_id], func: "BC_insert_update" };
        var success_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        var error_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        ajax.ajax_common(obj_save, success_func, error_func);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    });
};
layObj.form("新增", success_func,test, tb_id);
};
// 编辑功能
table_act.update = function(res, tb_id, data) {
var test_arr = [];
var old_arr = [];

//循环字段名
for (i in res.列表[0]) {
    test_arr.push(i);
}

//循环字段名所对应的值
for (var j in data) {
    old_arr.push(data[j]);
}
var test = "";

//赋给录入时期的的input的一个id名
var classTest=""
test_arr.pop();
for (var i = 0; i < test_arr.length; i++) {
    // 特殊编码转义
    old_arr[i] = old_arr[i].replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
    if(test_arr[i]=="录入时间"){
    	classTest="dateClass"
    }
    test +='<div class="layui-form-item"><label class="layui-form-label">' +
      test_arr[i] +
      '</label> <div class="layui-input-block"> <input type="text" id="'+classTest+'" name="' +
      test_arr[i] +
      '" autocomplete="off" value="'+
      old_arr[i]+'" class="layui-input insert-input"> </div> </div>';
}

var success_func = function() {
    $("*[name='id']").attr("disabled", "true");
    $("*[name='id']").attr("placeholder", "");

    layui.use("form", function() {
      var form = layui.form;
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        var obj_save = { datas: [data.field, data.tb_id], func: "BC_insert_update" };
        var success_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        var error_func = function(res) { layer.alert(res.状态, function() { layer.closeAll();history.go(0) }); };
        ajax.ajax_common(obj_save, success_func, error_func);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    });
    
    /**
     * 更改录入时间
     */
    layui.use('laydate', function(){
		  var laydate = layui.laydate;
		  
		  //执行一个laydate实例
		  laydate.render({
		  	type:"datetime",
		    elem: '#dateClass' //指定元素
		  });
		});
};
layObj.form("编辑", success_func, test, tb_id);
};
