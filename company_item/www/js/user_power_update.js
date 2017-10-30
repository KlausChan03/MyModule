
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
      $("*[name='id']").attr("placeholder", "");
  
      layui.use("form", function() {
        var form = layui.form;
        // console.log(tb_id)
        form.on("submit(formDemo)", function(data) {
          data.tb_id = tb_id;
          var obj_save = {
            datas: [data.field, data.tb_id],
            func: "BC_insert_update"
          };
          var success_func = function(res) {
            layer.alert(res.状态, function() {
              layer.closeAll();
              history.go(0);
            });
          };
          var error_func = function(res) {
            layer.alert(res.状态, function() {
              layer.closeAll();
              history.go(0);
            });
          };
          ajax.ajax_common(obj_save, success_func, error_func);
          return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
      });
    };
    layObj.form("新增", success_func, test, tb_id);
  };
  // 编辑功能
  table_act.update = function(res, tb_id, data) {
    var test_arr = [];
    var old_arr = [];
  
    //循环字段名
    for (i in res.列表[0]) {
      test_arr.push(i);
    }
    console.log(test_arr,"111")
    //循环字段名所对应的值
    console.log(data,"666")
    for (var j in data) {
      old_arr.push(data[j]);
    }
    var test = "";
    console.log(old_arr,"222")
    
    //赋给录入时期的的input的一个id名
    var classTest = "";
    test_arr.pop();
    for (var i = 0; i < test_arr.length; i++) {
      // 特殊编码转义
      // old_arr[i] = old_arr[i]
      //   .replace(/'/g, "&#39;")
      //   .replace(/"/g, "&quot;")
      //   .replace(/>/g, "&gt;")
      //   .replace(/</g, "&lt;");
  
      test +=
        '<div class="layui-form-item"><label class="layui-form-label">' +
        test_arr[i] +
        '</label> <div class="layui-input-block"> <input type="text"  name="' +
        test_arr[i] +
        '" autocomplete="off" value="' +
        old_arr[i] +
        '" class="layui-input insert-input"> </div> </div>';
    }
  
    
    console.log(test,"333")
    
    var success_func = function() {
      $("*[name='id']").attr("disabled", "true");
      $("*[name='id']").attr("placeholder", "");
      $("*[name='录入时间']").addClass("dateClass");
    
      layui.use("form", function() {
        var form = layui.form;
        form.on("submit(formDemo)", function(data) {
          data.tb_id = tb_id;
          var obj_save = {
            datas: [data.field, data.tb_id],
            func: "BC_insert_update"
          };
          var success_func = function(res) {
            layer.alert(res.状态, function() {
              layer.closeAll();
              history.go(0);
            });
          };
          var error_func = function(res) {
            layer.alert(res.状态, function() {
              layer.closeAll();
              history.go(0);
            });
          };
          ajax.ajax_common(obj_save, success_func, error_func);
          return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
      });
  
      /**
       * 更改录入时间
       */
      layui.use("laydate", function() {
        var laydate = layui.laydate;
  
        //执行一个laydate实例
        laydate.render({
          type: "datetime",
          elem: ".dateClass" //指定元素
        });
      });
    };
    layObj.form("编辑", success_func, test, tb_id);
  };
  