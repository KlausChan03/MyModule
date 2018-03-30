document.write(`
    <div class="footer">
        <div>
            <ul class="footer-nav clearfloat">
                <li class="fl">
                    <ul>
                        <li><a href="javascript:void(0);">关于我们</a></li>
                        <li><a href="about_us.html">联盟简介</a></li>
                        <li><a href="about_charter.html">联盟章程</a></li>
                        <li><a href="about_organization.html">组织机构</a></li>
                        <li><a href="about_leader.html">联盟领导</a></li>
                        <li><a href="about_contact.html">联系我们</a></li>
                    </ul>
                </a></li> 
                <li class="fl">
                    <ul>
                        <li><a href="javascript:void(0);">会员服务</a></li>
                        <li><a href="member_service.html">服务介绍</a></li>
                        <li><a href="member_join.html">入会流程</a></li>
                        <li><a href="member_list.html">会员名录</a></li>
                        <li><a href="member_elegant.html">会员风采</a></li>
                    </ul>
               </li>
                <li class="fl wechat">
                    <ul>
                        <li>
                            <img src="./img/u75.png" alt="">
                            <span>官方公号，关注有礼</span>                        
                        </li>
                    </ul>                    
                </li> 
                <li class="fl weibo">
                    <ul>
                        <li>
                            <a href="#">
                                <img src="./img/u77.png" alt="">
                                <span>新浪微博</span>
                            </a>
                        </li>
                    </ul>
                </li> 
                <li class="fl">
                    <ul>
                        <li><a href="#">友情链接</a></li>
                        <li><a href="#">国家旅游局</a></li>
                        <li><a href="#">贵州省人民政府</a></li>
                        <li><a href="#">世界旅游组织</a></li>
                        <li><a href="#">中国山地联合会</a></li>
                        <li><a href="#">更多>></a></li>
                    </ul>
                </li>         
            </ul>
            <div class="footer-info">
                <div>
                    <span>国际山地旅游联盟版权所有@2018 </span><a><span>京ICP备12025925号 </span></a>
                </div>
                <div>
                    <span><a href="http://www.exmail.qq.com" target="_blank">邮箱登录</a></span><span><a href="#">会议系统</a></span>
                </div>
            </div>
        </div>
        
    </div>
`);

// 菜单被选中渲染
var localPath = location.pathname;
var localName = localPath.substr(localPath.lastIndexOf("/") + 1);
localName = localName.split(/\./)[0];
localName = localName.split(/\_/)[0];
switch (localName) {
  case "index":
    $(".page-index").addClass("layui-this");
    break;
  case "news":
    $(".page-news").addClass("layui-this");
    break;
  case "activity":
    $(".page-activity").addClass("layui-this");
    break;
  case "member":
    $(".page-member").addClass("layui-this");
    break;
  case "study":
    $(".page-study").addClass("layui-this");
    break;
  case "party":
    $(".page-party").addClass("layui-this");
    break;
  case "picture":
    $(".page-picture").addClass("layui-this");
    break;
  case "media":
    $(".page-media").addClass("layui-this");
    break;
case "forum":
    $(".page-forum").addClass("layui-this");
    break;
  case "about":
    $(".page-about").addClass("layui-this");
    break;
}

layui.use("form", function() {
  var form = layui.form;
  form.on("select(language)", function(data) {
    if (data.value == "0") {
      window.location.href = `./EN/index.html`;
    } else {
      window.location.href = `./index.html`;
    }
  });
});

// 图片hover时局部放大
$(".img-container").css({ overflow: "hidden" });
$(".img-container img").css({ transition: "all 0.6s" });
$(".img-container img").hover(
  function() {
    console.log("i am img");
    $(this).css({ transform: "scale(1.2)" });
    $(this)
      .parent()
      .css("height", $(this).css("height"));
    $(this)
      .parent()
      .css("width", $(this).css("width"));
  },
  function() {
    $(this).css({ transform: "scale(1)" });
    $(this)
      .parent()
      .css("height", $(this).css("height"));
    $(this)
      .parent()
      .css("width", $(this).css("width"));
  }
);
