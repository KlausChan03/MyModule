"use strict";
var form_act = {};
var pic_name, video_name;
form_act.add_video_pic = function(pic, video) {
  layui.use(["upload", "element", "layer"], function() {
    var $ = layui.jquery,
      upload = layui.upload,
      element = layui.element,
      layer = layui.layer;
    if (form_special_control.video && form_special_control.video_open == true) {
      form_special_control.video.map(function(key, name) {
        video_name = $(`*[name='${form_special_control.video[name]}']`); // video_name
          //直接上传
          // video_name.attr({ readonly: "readonly" }).addClass("required");
          var $video = video_name;
          $video.addClass("video-input");
          $video.css({ width: "100%" });
          $video.parent().addClass("flex flex-hb-vc");
          $video
            .parent()
            .append(
              '<div style="margin-left:10px;">' +
                '<button type="button" class="layui-btn layui-btn-mini" id="video-input"> <i class="layui-icon">&#xe67c;</i>上传视频 </button>' +
                '<input type="file" name="file" id="file" accept=".mp4" value="" style="display: none;" /><p class="loading-icon" style="display:none"></p>' +
                '<div class="video-progress layui-progress layui-progress" lay-showpercent="true" lay-filter="demo" style="width: 85px;margin-top: 20px;display:none"><div class="layui-progress-bar layui-bg-red" lay-percent="0%"></div></div></div>'
            );
          $("#video-input").click(function() {
            $("#file").click();
          });
          document
            .getElementById("file")
            .addEventListener("change", function(e) {
              // 初始化设置
              var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
              var file = e.target.files[0];
              var fileSize = 0;
              var size = fileSize / 1024;
              var name = e.target.value;
              var fileName = name
                .substring(name.lastIndexOf(".") + 1)
                .toLowerCase();

              if (isIE && !e.target.files) {
                var filePath = e.target.value;
                var fileSystem = new ActiveXObject(
                  "Scripting.FileSystemObject"
                );
                var file = fileSystem.GetFile(filePath);
                fileSize = file.Size;
              } else {
                fileSize = e.target.files[0].size;
              }
              if (size > 40000) {
                layer.msg("附件不能大于40M");
                e.target.value = "";
                return;
              }

              if (fileName != "mp4") {
                layer.msg("请选择mp4格式文件上传！");
                e.target.value = "";
                return;
              }

              // ajax请求配置文件以及上传
              obj_save = {
                datas: "",
                func: "get_alicloudConfig"
              };
              success_func = (res) => {
                // require(["/js/lib/aliyun-oss.js"], function(OSS) {
                var client = new OSS.Wrapper({
                  region: res.conf.region,
                  accessKeyId: res.conf.accessKeyId,
                  accessKeySecret: res.conf.accessKeySecret,
                  bucket: res.conf.bucket
                });

                element.init();
                $(".video-progress").show(1000);
                // 定义MP4文件名
                var video_name = getTime(1) + generateMixed(4) + ".mp4";
                client
                  .multipartUpload(video_name, file, {
                    progress: function*(p) {
                      element.progress("demo", (p * 100).toFixed(2) + "%");
                      if (p * 100 == 100) {
                        $(".video-progress").hide(1000);
                        layer.msg("上传成功");
                      }
                    }
                  })
                  .then(function(result) {
                    var video_url = result.res.requestUrls[0].split("?")[0];
                    $(".video-input").val(video_url);
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
                // });
              };
              error_func = (res) => {
                console.log(res);
              };
              ajax.ajax_common(obj_save, success_func, error_func);
            });
      });
    }
    if (form_special_control.pic) {
      form_special_control.pic.map(function(key, name) {
        pic_name = $(`*[name='${form_special_control.pic[name]}']`); // $("*[name='图片地址']")
        if (pic_name) {
          // pic_name.attr({ readonly: "readonly" }).addClass("required");
          var pic_arr = [];
          var pic_str = "";
          var multiple = "";
          var $pic = pic_name;
          $pic.addClass("pic-input");
          $pic.css({ width: "100%" });
          $pic.parent().addClass("flex flex-hb-vc");
          $pic
            .parent()
            .parent()
            .append('<div class="show-block" id="show-block"></div>');
          var $show = $(".show-block");
          if (form_special_control.pic_type == "all") {
            $pic
              .parent()
              .append(
                '<button type="button" class="layui-btn layui-btn-mini" id="pic-input"  style="margin-left:10px"> <i class="layui-icon">&#xe67c;</i>上传多图 </button><button type="button" class="layui-btn layui-btn-mini" id="pic-reset" style="margin-left:10px"> <i class="layui-icon">&#x1006;</i>清空图片 </button>'
              );
            multiple = true;
          } else if (form_special_control.pic_type == "one") {
            $pic
              .parent()
              .append(
                '<button type="button" class="layui-btn layui-btn-mini" id="pic-input"  style="margin-left:10px"> <i class="layui-icon">&#xe67c;</i>上传图片 </button>'
              );
            multiple = false;
          }

          if (pic_name.val() != "" && form_special_control.pic_type == "all") {
            var msg = {};
            msg.地址 = pic_name.val();
            pic_arr = msg.地址.split(",");
            for (let i in pic_arr) {
              pic_arr[i] += ",";
            }
            pic_show(msg);
          } else if (pic_name.val() != "" && form_special_control.pic_type == "one") {
            var msg = {};
            msg.地址 = pic_name.val();
            pic_arr = msg.地址.split(",");
            pic_show(msg);
            $("#pic-input") .attr({ disabled: "disabled", title: "请先删除之前上传的图片" }) .css({ background: "#999" });
          }

          function pic_show(res) {
            if (form_special_control.pic_type == "all") {
              res.地址 = res.地址.replace(/,$/, "").split(",");
              for (let i in res.地址) {
                $show.append( `<div class="show-pic"><img class="show-pic-main" title="右键可复制地址" src="${res.地址[i]}"><span class="show-pic-close"><i class="layui-icon" style="font-size:24px">&#x1007;</i></span></div>`);
              }
            } else {
              $show.append( `<div class="show-pic"><img class="show-pic-main" title="右键可复制地址" src="${res.地址[i]}"><span class="show-pic-close"><i class="layui-icon" style="font-size:24px">&#x1007;</i></span></div>` );
            }
          }
          function pic_show_act() {
            var $close = $(".show-pic-close");
            var $reset = $("#pic-reset");
            $close.off("click").on("click", function() {
              if (form_special_control.pic_type == "one") {
                $("#pic-input") .attr({ title: "可以上传" }) .removeAttr("disabled") .css({ background: "#2B9CED" });
              }
              var $index = $(this) .parent() .index();
              $show.find($(".show-pic:eq(" + $index + ")")).remove();
              var pic_arr_ = pic_arr;
              var pic_arr_new = [];
              pic_arr.splice($index, 1);
              for (let i in pic_arr_) {
                pic_arr_new.push(pic_arr_[i]);
              }
              var pic_str_new = pic_arr_new.toString();
              pic_str_new = pic_str_new .replace(/,$/, "");
              $pic.val(pic_str_new);
            });

            $reset.off("click").on("click", function() {
              pic_arr = [];
              $pic.val("");
              $show.empty();
              $("#pic-input") .attr({ title: "可以上传" }) .removeAttr("disabled") .css({ background: "#2B9CED" });
            });
          }

          pic_show_act();

          var uploadInst = upload.render({
            elem: "#pic-input",
            url: "/temp",
            auto: true,
            size: 3000, //单张图片尺寸上限为3Mb
            number: 8, //图片总数量限制为8张
            multiple: multiple,
            done: function(res) {
              var datas = {};
              datas.img_list = res.newpath;
              datas = JSON.stringify(datas);
              $.ajax({
                url: "/ajax.post?func=test_upload",
                type: "POST",
                data: "data=" + datas,
                success: function(res) {
                  layer.msg("上传成功");
                  if (form_special_control.pic_type == "one") {
                    $("#pic-input")
                      .attr({
                        disabled: "disabled",
                        title: "请先删除之前上传的图片"
                      })
                      .css({ background: "#999" });
                  }
                  if (res.状态 == "上传成功") {
                    pic_arr.push(res.地址 + ",");
                    pic_str = pic_arr.toString();
                    pic_str = pic_str
                      .replace(/,,/g, ",")
                      .replace(/,$/, "");
                    $pic.val(pic_str);
                    pic_show(res);
                    pic_show_act();
                  } else {
                    layer.msg("上传失败");
                  }
                }
              });
            }
          });
        }
      });
    }
  });
};

form_act.editor = function() {
  layui.use(["upload", "element", "layer"], function() {
    var $ = layui.jquery,
      upload = layui.upload,
      element = layui.element,
      layer = layui.layer;
    if ($("*[name='内容']") && form_special_control.rich_open == true) {
      var $text = $("*[name='内容']");
      $text.addClass("text-input");
      $text
        .parent()
        .append(
          '<button type="button" class="layui-btn layui-btn-mini" id="text-button" style="float:right"> <i class="layui-icon">&#xe61a;</i>展开编辑 </button><button type="button" class="layui-btn layui-btn-mini" id="commit-button" style="display:none;float:right;margin-right:10px"> <i class="layui-icon">&#xe605;</i>确认编辑 </button>'
        );
      $text.css({ display: "none" });
      // $text.parent().addClass("flex flex-hr-vc")
      $text
        .parent()
        .prepend(
          '<div id="editor" style="display:none"><div id="div1" class="toolbar" ></div> <div class="editor-top" ><input type="text" class="editor-title" placeholder="请输入标题" ><input type="text" class="editor-info" placeholder="请输入时间和作者" style=" "> </div> <div id="div2" class="text" ></div></div>'
        );
      var $button_turn = $("#text-button");
      var $button_commit = $("#commit-button");

      // require(["/template/wangEditor/wangEditor.min.js"], function(E) {
      var E = window.wangEditor;
      var editor = new E("#div1", "#div2");
      editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "italic", // 斜体
        "underline", // 下划线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "undo", // 撤销
        "redo" // 重复
      ];
      // 解决引入H1和H5输入框后焦点冲突问题
      $(".editor-top").css({ "z-index": "10001" });
      $("#div2").click(function() {
        $(".editor-top").css({ "z-index": "10001" });
      });
      $("#div1").click(function() {
        $(".editor-top").css({ "z-index": "10000" });
      });
      $("#div1").mouseover(function() {
        $(".editor-top").css({ "z-index": "10000" });
      });

      editor.create();

      var flag = 1;
      $button_turn.click(function() {
        if ($("*[name='内容']").val() != "") {
          var editor_arr = $("*[name='内容']")
            .val()
            .replace("</h1><h5>", "</h1>__占位__<h5>")
            .replace("</h5>", "</h5>__占位__");
          editor_arr = editor_arr.split("__占位__");
          // 判断原本是否含有<h1>和<h5>标签
          if (editor_arr[0] != undefined && editor_arr[1] != undefined) {
            $(".editor-title").val(
              editor_arr[0].replace("<h1>", "").replace("</h1>", "")
            );
            $(".editor-info").val(
              editor_arr[1].replace("<h5>", "").replace("</h5>", "")
            );
          } else {
            $(".editor-title").val(editor_arr[0]);
            $(".editor-info").val(editor_arr[1]);
          }
          editor.txt.html(editor_arr[2]);
        }
        if (flag == 1) {
          flag = 0;
          $("#editor").show();
          $button_commit.show().css({ "margin-top": "10px" });
          $button_turn
            .html('<i class="layui-icon">&#xe619;</i>收起编辑')
            .css({ "margin-top": "10px" });
          $button_commit.click(function() {
            console.log($(".editor-title").val());
            var e_title = "<h1>" + $(".editor-title").val() + "</h1>";
            var e_info = "<h5>" + $(".editor-info").val() + "</h5>";
            var final_text = e_title + e_info + editor.txt.html();
            console.log(final_text);
            $("*[name='内容']").val(final_text);
            // if ($("*[name='内容']").val() == final_text) {
            layer.msg("编辑成功", { icon: 1, time: 2000 });
            // }
          });
        } else {
          flag = 1;
          $("#editor").hide();
          $button_commit.hide().css({ "margin-top": "0px" });
          $button_turn
            .html('<i class="layui-icon">&#xe61a;</i>展开编辑')
            .css({ "margin-top": "10px" });
        }
      });
      // });
    }
  });
};
