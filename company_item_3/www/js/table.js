"use strict";

// 新方法实现数据渲染
layui.use(["table", "form","upload"], function() {

  var table = layui.table;
  var form = layui.form;
  var upload = layui.upload;
  var $ = layui.jquery;
  var ifarme_func = window.top.document.getElementsByClassName("iframe_");

  //获取iframe url的参数信息
  var tb_id = GetRequest(ifarme_func).bc_id;
  var pic_type = GetRequest(ifarme_func).pic_type;
  console.log(pic_type)
  var data={};
  var toolbar = true;

  //存数据
  data.field = "";
  //验证表名
  data.tb_id = tb_id;
  data.type = "all";
  var obj_save = {
    datas: [data.field, data.tb_id, data.type],
    func: GetRequest(ifarme_func).func
  };

  var success_func = function(res) {
    //渲染标题
    var tb_title = res.表格名称;
    tb_title = tb_title.replace("表", "");
    $(".table-title").html(tb_title);

    changeTableStutas(res,toolbar)
    
    var obj_save = { datas: tb_id, func: "admin_control_function" };
    var success_func = function(res) {
        if(res.keyPower!=""){
          var key_arr =[];
          for(var i in res.keyPower){
            key_arr.push(res.keyPower[i]);
          }
        }
        if(key_arr!=""){
          for (var j in key_arr){
            if(key_arr[j] == "删除" || key_arr[j] == "修改" ){
              switch (key_arr[j])
              {
                case "修改":
                $(".layui-hide").append('<a class="layui-btn layui-btn-mini" lay-event="edit"><i class="layui-icon" style="font-size: 16px; color: #eee;">&#xe642;</i>'+key_arr[j]+'</a>') 
                break;
                case "删除":
                $(".layui-hide").append('<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del"><i class="layui-icon" style="font-size: 16px; color: #eee;">&#xe640;</i>'+key_arr[j]+'</a>') 
                break;
              }                
            } else if (key_arr[j] == "新增" || key_arr[j]=="编辑"){    
              switch (key_arr[j])
              {
                case "新增":
                $(".layui-btn-group").append('<button class="layui-btn layui-btn-normal layui-btn-mini" data-type="insertData"> <i class="layui-icon">&#xe654;</i>'+key_arr[j]+' </button>')                          
                break; 
                case "编辑":
                $(".layui-btn-group").append('<button class="layui-btn layui-btn-normal layui-btn-mini" data-type="eidtData" style="margin-left:10px!important"> <i class="layui-icon">&#xe654;</i>'+key_arr[j]+' </button>')                          
                break;                
              }        
            }
          }
        } else{
          toolbar = false;
        }
        
        // 获取按钮后表格内按钮重载
        table.reload("test");

        // 获取按钮后表格外按钮重载
        $(".layui-btn").on("click", function() {
          var type = $(this).data("type");
          active[type] ? active[type].call(this) : "";
        });
        
      };
      var error_func = function (res) {
        if(res.状态 == "当前未登录"){ 
          layer.open({
            type: 1,
            title: "信息",
            area: '310px',
            id: 'LAY_layuipro',
            btn: ['确定'],
            content: '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p>登陆已超时</p></div>',
            yes:function(){
              parent.window.location.href="/page/login/login.html";					
            }
          });
        }
      }
    ajax.ajax_common(obj_save, success_func,error_func);

    /**
     * 单条查询10/21 zhou
     */
    // 搜索刷新列表
    form.render("select");

    $("#seacherButton").on("click", function() {
      var syllable = $(".layui-select-title input").val();
      var syllableVal = $("#souVal").val();

      var data = {};
      data.field = [syllable, syllableVal];
      data.tb_id = tb_id;
      data.type = "one";
      var obj_save = {
        datas: [data.field, data.tb_id, data.type],
        func: GetRequest(ifarme_func).func
      };
			var success_func=function(res){
		    	  	  // 生成表格
          var resSingle=res;
          toolbar = true;
          changeTableStutas(resSingle,toolbar)

			}
      var error_func = function(res) {
        console.log(res)
        if (res.状态 == "获取列表异常") {
          layer.alert("查询无结果", { icon: 2 },function(){
            history.go(0);                      
          });
        } else {
          layer.alert(res.状态, { icon: 2 },function(){
            history.go(0);           
          });
        }
      };
      ajax.ajax_common(obj_save, success_func, error_func);
    });

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

   
  };
  var error_func = function(res) {
    // console.log(res);
    if (res.状态 == "获取列表异常") {
      //渲染标题
      var tb_title = res.表格名称;
      tb_title = tb_title.replace("表", "");
      $(".table-title").html(tb_title);

      $(".layui-form").append(
        "<img class='no-data' src='../../images/no_data.png' />"
      );
      // $(".no-data").css({"width":"100px","height":"100px"})
    }
  };
  ajax.ajax_common(obj_save, success_func, error_func);


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
      '</label> <div class="layui-input-block"> <input type="text" name="' +
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
    

    $("*[name='id']").attr("readonly", "readonly");
    $("*[name='id']").attr("placeholder", "");
    
    if($("*[name='视频地址']")||$("*[name='图片地址']")){ 
      add_video_pic(pic_type)
    }

    $("*[name='权限']").click(function(){
      var obj_save = {datas:"",func:""}
      var success_func = function(){console.log(res)}
      var error_func = function(){console.log(res)}
      ajax.ajax_common(obj_save,success_func,error_func)
    })

    layui.use("form", function() {
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        if("file" in data.field){
          delete data.field.file
        }
        console.log(data.field)
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
  console.log(old_arr)
  var test = "";

  
  //赋给录入时期的的input的一个id名
  var classTest = "";
  test_arr.pop();
  for (var i = 0; i < test_arr.length; i++) {

    // 特殊编码转义
    if(typeof(old_arr[i])=="string"){
      old_arr[i] = old_arr[i].replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/>/g, "&gt;").replace(/</g, "&lt;"); 
    }
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


    $("*[name='id']").attr("disabled", "true");
    $("*[name='id']").attr("placeholder", "");
    $("*[name='录入时间']").addClass("dateClass");
    if($("*[name='视频地址']")||$("*[name='图片地址']")){ 
      add_video_pic(pic_type)
    }

  
    layui.use("form", function() {
      form.on("submit(formDemo)", function(data) {
        data.tb_id = tb_id;
        if("file" in data.field){
          delete data.field.file
        }
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

});


function add_video_pic(pic_type) {
	$("*[name='图片地址']").attr({ "readonly": "readonly", "required": "required" });
	$("*[name='视频地址']").attr({ "readonly": "readonly", "required": "required" });

  layui.use(['upload', 'element','layer'], function() {
    var $ = layui.jquery,
    upload = layui.upload,
    element = layui.element,
    layer = layui.layer;


		var $video = $("*[name='视频地址']");
		$video.addClass("video-input");
		$video.css({ "width": "80%" });
    $video.parent().addClass("flex flex-hb-vc")
    
		$video.parent().append('<button type="button" class="layui-btn layui-btn-mini" id="video-input"> <i class="layui-icon">&#xe67c;</i>上传视频 </button><p class="loading-icon" style="display:none"></p>');
		var uploadInst = upload.render({
			elem: '#video-input',
			url: '/temp',
			accept: 'video',
      auto: true,
			done: function(res) {
				var datas = {};
				datas.img_list = res.newpath;
				datas = JSON.stringify(datas);
				console.log(datas)
				$.ajax({
					url: "/ajax.post?func=massMP4",
					type: "POST",
					data: "data=" + datas,
					beforeSend: function() {
            //  $video.parent().append(' ')
            layer.open({
              id:"upload",
              type:1,              
              title:"上传进度",
              closeBtn: 0, //不显示关闭按钮
              content:'<div class="flex-hc-vc" style="width: 100%; height: 100%; padding: 0 30px; box-sizing: border-box;"><div class="layui-progress layui-progress-big" lay-showPercent="true" lay-filter="demo" style="width: 100%;"> <div class="layui-progress-bar layui-bg-green" lay-percent="0%"></div> </div></div>',
              area:["250px","200px"],
              success:function(){
                element.init();
              },
            })
            element.progress('demo', '0%');
						// $(".loading-icon").show().html('<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop loading">&#xe63d;</i>')
					},
					success: function(res) {

            // for(var i=0;i<res.上传时间.length;i++){
            //   element.progress('demo', ''+res.上传时间[i]+'');
            // }
						if(res.状态 == "上传成功") {
              element.progress('demo', '100%');
              setTimeout(function(){
                
              layer.close(layer.index);
                var video_url = res.地址.split("?uploadId")[0]
                $(".video-input").val(video_url)
                layer.msg('上传成功');
              },1000)
							// $(".loading-icon").hide();

						} else {
							layer.msg('上传失败');
						}
					}
				});
			}
		});

    if($("*[name='图片地址']")) {
      var pic_arr =[];
      var multiple = "";
			var $pic = $("*[name='图片地址']");
			$pic.addClass("pic-input");
			$pic.css({ "width": "80%" });
      $pic.parent().addClass("flex flex-hb-vc")

      if(pic_type == "all"){
        $pic.parent().append('<button type="button" class="layui-btn layui-btn-mini" id="pic-input"> <i class="layui-icon">&#xe67c;</i>上传多图 </button>');
        multiple = true;
      }else if(pic_type == "one"){
        $pic.parent().append('<button type="button" class="layui-btn layui-btn-mini" id="pic-input"> <i class="layui-icon">&#xe67c;</i>上传图片 </button>');
        multiple = false;
      }
        var uploadInst = upload.render({
          elem: '#pic-input',
          url: '/temp',
          auto: true,
          multiple: multiple,
          done: function(res) {
            console.log(res)
            var datas = {};
            datas.img_list = res.newpath;
            datas = JSON.stringify(datas);
            console.log(datas)
            $.ajax({
              url: "/ajax.post?func=massMP4",
              type: "POST",
              data: "data=" + datas,
              success: function(res) {
                console.log(res.地址)
                if(res.状态 == "上传成功") {
                  pic_arr.push(res.地址);
                  $(".pic-input").val(pic_arr);
                  layer.msg('上传成功');
                } else {
                  layer.msg('上传失败');
                }
              }
            });
          },
          // error: function() {
          //   //演示失败状态，并实现重传
          //   var demoText = $('#demoText');
          //   demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
          //   demoText.find('.demo-reload').on('click', function() {
          //     uploadInst.upload();
          //   });
          // }
        });

      }
	})
}