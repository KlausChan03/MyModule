var form_act = {};
form_act.add_video_pic = function(pic_type) {
  layui.use(["upload", "element", "layer"], function() {
    var $ = layui.jquery,
      upload = layui.upload,
      element = layui.element,
      layer = layui.layer;

    // $("*[name='图片地址']")
    //   .attr({ readonly: "readonly", "lay-verify": "required" })
    //   .addClass("required");
    // $("*[name='视频地址']")
    //   .attr({ readonly: "readonly", "lay-verify": "required" })
    //   .addClass("required");

    var $video = $("*[name='视频地址']");
    $video.addClass("video-input");
    $video.css({ width: "80%" });
    $video.parent().addClass("flex flex-hb-vc");

    $video
      .parent()
      .append(
        '<button type="button" class="layui-btn layui-btn-mini" id="video-input"> <i class="layui-icon">&#xe67c;</i>上传视频 </button><p class="loading-icon" style="display:none"></p>'
      );
    var uploadInst = upload.render({
      elem: "#video-input",
      url: "/temp",
      accept: "video",
      auto: true,
      done: function(res) {
        var datas = {};
        datas.img_list = res.newpath;
        datas = JSON.stringify(datas);
        console.log(datas);
        // layer.open({
        //   id: "upload",
        //   type: 1,
        //   title: "上传进度",
        //   closeBtn: 0, //不显示关闭按钮
        //   content:'<div class="flex-hc-vc" style="width: 100%; height: 100%; padding: 0 30px; box-sizing: border-box;"><div class="layui-progress layui-progress-big" lay-showPercent="true" lay-filter="demo" style="width: 100%;"> <div class="layui-progress-bar layui-bg-green" lay-percent="0%"></div> </div></div>',
        //   area: ["250px", "150px"],
        //   success: function() {
        //     element.init();
        //   }
        // });
        // element.progress("demo", "0%");

        // var t = 0;
        // setInterval(function(){
        //   t = t+20;
        //   element.progress('demo', t+'%');
        // },10000)

        $(".loading-icon")
          .show()
          .html(
            '<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop loading">&#xe63d;</i>'
          );
        $.ajax({
          url: "/ajax.post?func=upload_video",
          type: "POST",
          data: "data=" + datas,
          beforeSend: function() {},
          success: function(res) {
            if (res.状态 == "上传成功") {
              // console.log(t)
              // t= 0;
              // clearInterval();
              //   element.progress("demo", "100%");
              setTimeout(function() {
                // layer.close(layer.index);
                var video_url = res.地址.split("?uploadId")[0];
                $(".video-input").val(video_url);
                layer.msg("上传成功");
              }, 1000);
              $(".loading-icon").hide();
            } else {
              layer.msg("上传失败");
            }
          }
        });
      }
    });

    if ($("*[name='图片地址']")) {
      var pic_arr = [];
      var pic_str = "";
      var multiple = "";
      var $pic = $("*[name='图片地址']");
      $pic.addClass("pic-input");
      $pic.css({ width: "80%" });
      $pic.parent().addClass("flex flex-hb-vc");

      if (pic_type == "all") {
        $pic
          .parent()
          .append(
            '<button type="button" class="layui-btn layui-btn-mini" id="pic-input"> <i class="layui-icon">&#xe67c;</i>上传多图 </button>'
          );
        multiple = true;
      } else if (pic_type == "one") {
        $pic
          .parent()
          .append(
            '<button type="button" class="layui-btn layui-btn-mini" id="pic-input"> <i class="layui-icon">&#xe67c;</i>上传图片 </button>'
          );
        multiple = false;
      }
      var uploadInst = upload.render({
        elem: "#pic-input",
        url: "/temp",
        auto: true,
        size: 3000,
        multiple: multiple,
        done: function(res) {
          console.log(res);
          var datas = {};
          datas.img_list = res.newpath;
          datas = JSON.stringify(datas);
          console.log(datas);
          $.ajax({
            url: "/ajax.post?func=upload_pic",
            type: "POST",
            data: "data=" + datas,
            success: function(res) {
              console.log(res.地址);
              if (res.状态 == "上传成功") {
                pic_arr.push(res.地址 + "@split@");
                pic_str = pic_arr.toString();
                pic_str = pic_str
                  .replace(/@split@,/g, "@split@")
                  .replace(/@split@$/, "");
                $(".pic-input").val(pic_str);
                layer.msg("上传成功");
              } else {
                layer.msg("上传失败");
              }
            }
          });
        }
      });
    }
  });
};

form_act.editor = function(rich_open) {
  layui.use(["upload", "element", "layer"], function() {
    var $ = layui.jquery,
      upload = layui.upload,
      element = layui.element,
      layer = layui.layer;
    if ($("*[name='内容']") && rich_open == "true") {
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

      var E = window.wangEditor;
      var editor = new E("#div1", "#div2");

      editor.create();

      var flag = 1;
      $button_turn.click(function() {
        if ($("*[name='内容']").val() != "") {
          console.log($("*[name='内容']").val());
          var editor_arr = $("*[name='内容']")
            .val()
            .replace("</h1><h5>", "</h1>__占位__<h5>")
            .replace("</h5>", "</h5>__占位__");
          editor_arr = editor_arr.split("__占位__");
          $(".editor-title").val(
            editor_arr[0].replace("<h1>", "").replace("</h1>", "")
          );
          $(".editor-info").val(
            editor_arr[1].replace("<h5>", "").replace("</h5>", "")
          );
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
            if ($("*[name='内容']").val() == final_text) {
              layer.msg("编辑成功", { icon: 1, time: 2000 });
            }
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
    }
  });
};
