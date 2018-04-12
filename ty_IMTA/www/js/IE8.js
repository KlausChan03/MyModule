$(".header-login").css({"position":"relative"})
$(".header-login").append('<p class="input-placeholder" style="font-size:14px;z-index:-1">请输入搜索关键词</p>');
$(".input-placeholder").css({"position":"absolute","top":"0","left":"5px"})

document
.getElementById("input_")
.attachEvent("onpropertychange", function(e) {
  if (e.propertyName != "value") return;
  if($("#input_").val()!=""){
      $(".input-placeholder").hide()
  }else{
    $(".input-placeholder").show()      
  }
  
});

