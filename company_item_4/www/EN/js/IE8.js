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


$(".section-5-content div img:nth-child(5n-4)").css({"margin-left":"0"})
$(".section-4-content div:nth-child(1)").css({"width":"207px"})
$(".section-4-content div:nth-child(2)").css({"width":"207px"})
$(".section-4-content div:nth-child(3)").css({"width":"207px"})
$(".section-5-content img").css({"width":"207px"})
