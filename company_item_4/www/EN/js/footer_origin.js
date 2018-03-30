document.write(`
    <div class="footer footer-EN">
        <div>
            <ul class="footer-nav clearfloat">
                <li class="fl">
                    <ul>
                        <li><a href="#">Alliance Support</a></li>
                        <li class="i-email"><a href="#"><i><img src="./img/e10.png" /></i><span>Email : support@imta.org</span></a></li>
                        <li class="i-phone"><a href="#"><i><img src="./img/e11.png" /></i><span>Phone : (0086)851-85557227</span></a></li>
                    </ul>
                </a></li> 
                <li class="fl">
                    <ul>
                        <li><a href="#">Get Involved</a></li>
                        <li><a href="#">Follow @IMTA on Twitter and Llke The IMTA on Facebook. Share your
                        pictures and all the fun you are haveing leading up to #IMTA</a></li>
                    </ul>
               </li>
                <li class="logo-EN">
                    <img src="./img/e1.png" alt="">                     
                </li>         
            </ul>
            <div class="footer-info">
                <div>
                    <p>Room 1206, Kempinski Shangri-la Mansion, No.82, Hu Guo Road, Nanming District, Guiyang City, Guizhou Province, China </p>
                    <p>Copyright © 2018 International Mountain Tourism Alliance </p>
                </div>
            </div>
        </div>
        
    </div>
`)

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

layui.use('form', function () {
    var form = layui.form;
    form.on('select(language)', function (data) {
        if(data.value == "0"){
            window.location.href=`./index.html`;
        }else{
            window.location.href=`../index.html`;            
        }
    });
});

layui.use("laypage", function () {
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
        elem: "lay-page",
        count: 300,
        limit: 20,
        layout: ["prev", "page", "next"],
        last: 'End',
        first: 'Home',
        prev:'Prev',
        next:'Next'
    });
    laypage.render({
        elem: "lay-page-2",
        count: 300,
        limit: 20,
        layout: ["prev", "page", "next"],
        last: 'End',
        first: 'Home',
        prev:'Prev',
        next:'Next'
    });
    laypage.render({
        elem: "lay-page-3",
        count: 300,
        limit: 20,
        layout: ["prev", "page", "next"],
        last: 'End',
        first: 'Home',
        prev:'Prev',
        next:'Next'
    });
    laypage.render({
        elem: "lay-page-4",
        count: 300,
        limit: 20,
        layout: ["prev", "page", "next"],
        last: 'End',
        first: 'Home',
        prev:'Prev',
        next:'Next'
    });
    laypage.render({
        elem: "lay-page-5",
        count: 300,
        limit: 20,
        layout: ["prev", "page", "next"],
        last: 'End',
        first: 'Home',
        prev:'Prev',
        next:'Next'
    });
});

// 图片hover时局部放大
$(".img-container").css({"overflow":"hidden"})
$(".img-container img").css({"transition":"all 0.6s"})
$(".img-container img").hover(function(){
    console.log("i am img")
    $(this).css({"transform":"scale(1.2)"})
    $(this).parent().css("height",$(this).css("height"));
    $(this).parent().css("width",$(this).css("width"));           
},function(){
    $(this).css({"transform":"scale(1)"});
    $(this).parent().css("height",$(this).css("height"));
    $(this).parent().css("width",$(this).css("width"));                   
})