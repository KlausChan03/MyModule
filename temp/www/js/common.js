//弹窗提示框
function dialogHide() {
  $(".dialog").hide();
  $(".dialog-show").hide();
}

function dialogShow() {
  $(".dialog").show();
  $(".dialog-show").show();
}

$(".comfrim-btn").click(function() {
  dialogHide();
});

//toast提示框
var t = 3;

function toast(status) {
  $(".toast").show().addClass("shake");
  $(".toast .toast-su").html(status);
  var i = setTimeout(toast, 1000);
  t--;
  if (t <= 0) {
    $(".toast").hide();
    clearTimeout(i);
  }
}

//无更多数据和加载更多数据提示功能封装(/40)(需要引用flex布局样式)
var no_more = {};
no_more.content = "";
no_more.dom = "";
no_more._add = function(dom, content) {
  dom.append(
    '<div class="nomore-tips flex-hc-vc"> <hr class="flex1" /> <p>' +
      content +
      '</p> <hr class="flex1" /> </div>'
  );
  $(".nomore-tips").css({ height: "2.5rem", width: "100%" });
  $(".nomore-tips hr").css({
    border: "none",
    "border-top": "1px solid #ddd",
    margin: " 0 .75rem"
  });
  $(".nomore-tips p").css({ color: "#ddd", "font-size": ".7rem", margin: "0" });
};
no_more._delete = function() {
  $(".nomore-tips").remove();
};

var ajax = {};
ajax.ajax_depend_concurrent = function(
  obj_save,
  success_func,
  error_func,
  type
) {
  var ajax_type;
  if (!arguments[3]) {
    ajax_type = "POST";
  }
  var flags = 1;
  var func = obj_save.func;
  var datas = obj_save.datas;
  datas = JSON.stringify(datas);

  if (flags) {
    $.ajax({
      type: ajax_type,
      url: "/ajax.post?func=" + func,
      data: "data=" + datas,
      beforeSend: function() {
        flags = 0;
      },
      success: function(p) {
        flags = 1;
        console.log(p);
        success_func(p);
      },
      error: function(p) {
        error_func(p);
      }
    });
  }
};

ajax.ajax_common = function(obj_save, success_func, error_func, type) {
  var ajax_type;
  if (!arguments[3]) {
    ajax_type = "POST";
  }
  var func = obj_save.func;
  var datas = obj_save.datas;
  datas = JSON.stringify(datas);
  $.ajax({
    type: "POST",
    url: "/ajax.post?func=" + func,
    data: "data=" + datas,
    success: function(res) {
      if (res.状态 == "成功") {
        success_func(res);
      }
    },
    error: function(res) {
      if (res.状态 != "成功") {
        error_func(res);
      }
    }
  });
};
