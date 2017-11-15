var table_act = {};
// 删除功能
table_act.delete = function(res, tb_id, select_id) {
  var data = {};
  data.tb_id = tb_id;
  data.select_id = { id: select_id };
  var obj_save = { datas: [data.select_id, data.tb_id], func: "BC_delete" };
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
};
// 新增功能
table_act.insert = function(res, tb_id) {
  var test_arr = [];
  for (i in res.列表[0]) {
    test_arr.push(i);
  }
  var test = "";
  test_arr.pop();
  console.log(test_arr);
  for (var i = 0; i < test_arr.length; i++) {
    test +=
      '<div class="layui-form-item"><label class="layui-form-label">' +
      test_arr[i] +
      '</label> <div class="layui-input-block"> <input type="text"  name="' +
      test_arr[i] +
      '"   placeholder="请输入' +
      test_arr[i] +
      '" autocomplete="off" class="layui-input insert-input"> </div> </div>';
  }

  var success_func = function() {
    var insert_name = window.sessionStorage.getItem("name");
    var insert_time = getTime();

    $("*[name='录入人']").attr("readonly", "readonly");
    $("*[name='录入时间']").attr("readonly", "readonly");


    $("*[name='录入人']").val(insert_name);
    $("*[name='录入时间']").val(insert_time);


    $("*[name='id']").attr({"readonly":"readonly","placeholder":""});


    $("*[name='关键字']").attr("oninput","if(value.length>16)value=value.slice(0,16)")
    $("*[name='标题']").attr("oninput","if(value.length>16)value=value.slice(0,16)")

    // var len_testing = document.getElementsByName("关键字")[0];
    // len_testing.addEventListener("blur",function(){
    //   if($("*[name='关键字']").val().length>5){
    //     layer.msg("too long")
    //   }
    // })

    if ($("*[name='视频地址']") || $("*[name='图片地址']")) {
      form_act.add_video_pic(pic_type);
    }
    if($("*[name='内容']")){
      form_act.editor(rich_open);
    }


    $("*[name='权限']").click(function() {
      var obj_save = { datas: "", func: "" };
      var success_func = function() {
        console.log(res);
      };
      var error_func = function() {
        console.log(res);
      };
      ajax.ajax_common(obj_save, success_func, error_func);
    });

    layui.use("form", function() {
      var form = layui.form;
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        if ("file" in data.field) {
          delete data.field.file;
        }
        console.log(data.field);
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
  //循环字段名所对应的值
  for (var j in data) {
    old_arr.push(data[j]);
  }
  console.log(old_arr);
  var test = "";

  //赋给录入时期的的input的一个id名
  var classTest = "";
  test_arr.pop();
  for (var i = 0; i < test_arr.length; i++) {
    // 特殊编码转义
    if (typeof old_arr[i] == "string") {
      old_arr[i] = old_arr[i]
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;");
    }
    console.log(test_arr,"test2")
    // input[type="text"]的遍历生成html
    test +=
      '<div class="layui-form-item"><label class="layui-form-label">' +
      test_arr[i] +
      '</label> <div class="layui-input-block"> <input type="text"  name="' +
      test_arr[i] +
      '" autocomplete="off" value="' +
      old_arr[i] +
      '" class="layui-input insert-input"> </div> </div>';
  }

  var success_func = function() {
    var insert_name = window.sessionStorage.getItem("name");
    var insert_time = getTime();

    $("*[name='录入人']").attr("readonly", "readonly");
    $("*[name='录入时间']").attr("readonly", "readonly");

    $("*[name='录入人']").val(insert_name);
    $("*[name='录入时间']").val(insert_time);

    $("*[name='id']").attr({"readonly":"readonly","placeholder":""});
    
    $("*[name='录入时间']").addClass("dateClass");

    $("*[name='关键字']").attr("oninput","if(value.length>16)value=value.slice(0,16)")
    $("*[name='标题']").attr("oninput","if(value.length>16)value=value.slice(0,16)")

    if ($("*[name='视频地址']") || $("*[name='图片地址']")) {
      form_act.add_video_pic(pic_type);
    }
     if($("*[name='内容']")){
      form_act.editor(rich_open);
    }

    layui.use("form", function() {
      var form = layui.form;
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        if ("file" in data.field) {
          delete data.field.file;
        }
        var obj_save = {
          datas: [data.field, data.tb_id],
          func: "BC_insert_update"
        };
        var success_func = function(res) {
          layer.alert(res.状态, function() {
            layer.closeAll();

            // var now_page = $(".layui-laypage-skip input").val()
            // console.log(now_page)

            window.location.reload();
            // for ()
            // $(".layui-laypage-skip .layui-input").val(now_page)

            // $(".layui-laypage a:eq("+(now_page-1)+")").click()
            // console.log($(".layui-laypage-skip input").val())

            // console.log($(".layui-laypage-curr"))
            // console.log($(".laytable-cell-2-录入时间:eq(0) .layui-table-sort-desc"))
            // $(".layui-laypage-btn").click() ;
            // setTimeout(function(){

            // },1000)
            // history.go(0)
            // $(".laytable-cell-2-录入时间:eq(0) .layui-table-sort-desc").click();

            // table.reload('test', {
            // 	initSort: {
            // 		field: '录入时间', //排序字段，对应 cols 设定的各字段名
            // 		type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
            // 	},
            // });
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
