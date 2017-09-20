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

function tips(status) {
  $(".tips").show().addClass("shake");
  $(".tips .tips-in").html(status);
  var i = setTimeout(tips, 1000);
  t--;
  if (t <= 0) {
    $(".tips").hide();
    clearTimeout(i);
  }
}

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

//无更多数据和加载更多数据提示功能封装(/100)(需要引用flex布局样式)
var no_more_init = {};
no_more_init.content = '';
no_more_init.dom = '';
no_more_init._add = function(dom, content) {
	dom.append('<div class="nomore-tips flex-hc-vc" style="height: 1rem;width: 100%;"> <hr class="flex1" style="margin: 0 .3rem;" /> <p class="" style="font-size:.28rem">' + content + '</p> <hr class="flex1" style="margin: 0 .3rem;" /> </div>')
}
no_more_init._delete = function() {
	$(".nomore-tips").remove();
}


var ajax = {};
ajax.ajax_depend_concurrent = function(
  obj_save,
  success_func,
  error_func,
  type
) {
  var ajax_type;
  if (!arguments[2]) {
    error_func = function() {};
  }
  if (!arguments[3]) {
    ajax_type = "POST";
  }
  var flags = 1;
  var func = obj_save.func;
  var datas = obj_save.datas;
  datas = JSON.stringify(datas);
  console.log(func);
  if (flags) {
    $.ajax({
      type: "POST",
      url: func,
      data: "data=" + datas,
      beforeSend: function() {
        $(".opacity-bg").show();
        $(".spinner").show();
      },
      success: function(p) {
        console.log(p);
        if ((p.状态 = "成功")) {
          setTimeout(function() {
            success_func(p);
            $(".opacity-bg").hide();
            $(".spinner").hide();
          }, 2000);
        } else {
          error_func(p);
        }
      }
    });
  }
};

// ajax.ajax_common = function(obj_save, success_func, error_func, type) {
//   var ajax_type;
//   if (!arguments[3]) {
//     ajax_type = "POST";
//   }
//   var func = obj_save.func;
//   var datas = obj_save.datas;
//   datas = JSON.stringify(datas);
//   $.ajax({
//     type: "POST",
//     url: "/ajax.post?func=" + func,
//     data: "data=" + datas,
//     success: function(res) {
//       if (res.状态 == "成功") {
//         success_func(res);
//       }
//     },
//     error: function(res) {
//       if (res.状态 != "成功") {
//         error_func(res);
//       }
//     }
//   });
// };

ajax.ajax_common = function(obj_save, success_func, error_func, type) {
  var ajax_type;
  if (!arguments[2]) {
    error_func = function() {};
  }
  if (!arguments[3]) {
    ajax_type = "POST";
  }

  var func = obj_save.func;
  var datas = obj_save.datas;
  datas = JSON.stringify(datas);
  console.log(func);
  $.ajax({
    type: "POST",
    url: func,
    data: "data=" + datas,
    success: function(res) {
      if (res.状态 == "成功") {
        success_func(res);
      } else {
        error_func(res);
      }
    }
  });
};
