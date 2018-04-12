"use strict";

document.write("\n    <div class=\"footer\">\n        <div>\n            <ul class=\"footer-nav clearfloat\">\n                <li class=\"fl\">\n                    <ul>\n                        <li><a href=\"javascript:void(0);\">\u5173\u4E8E\u6211\u4EEC</a></li>\n                        <li><a href=\"about_us.html\">\u8054\u76DF\u7B80\u4ECB</a></li>\n                        <li><a href=\"about_charter.html\">\u8054\u76DF\u7AE0\u7A0B</a></li>\n                        <li><a href=\"about_organization.html\">\u7EC4\u7EC7\u673A\u6784</a></li>\n                        <li><a href=\"about_leader.html\">\u8054\u76DF\u9886\u5BFC</a></li>\n                        <li><a href=\"about_contact.html\">\u8054\u7CFB\u6211\u4EEC</a></li>\n                    </ul>\n                </a></li> \n                <li class=\"fl\">\n                    <ul>\n                        <li><a href=\"javascript:void(0);\">\u4F1A\u5458\u670D\u52A1</a></li>\n                        <li><a href=\"member_service.html\">\u670D\u52A1\u4ECB\u7ECD</a></li>\n                        <li><a href=\"member_join.html\">\u5165\u4F1A\u6D41\u7A0B</a></li>\n                        <li><a href=\"member_list.html\">\u4F1A\u5458\u540D\u5F55</a></li>\n                        <li><a href=\"member_elegant.html\">\u4F1A\u5458\u98CE\u91C7</a></li>\n                    </ul>\n               </li>\n                <li class=\"fl wechat\">\n                    <ul>\n                        <li>\n                            <img src=\"./img/u75.png\" alt=\"\">\n                            <span>\u5B98\u65B9\u516C\u53F7\uFF0C\u5173\u6CE8\u6709\u793C</span>                        \n                        </li>\n                    </ul>                    \n                </li> \n                <li class=\"fl weibo\">\n                    <ul>\n                        <li>\n                            <a href=\"#\">\n                                <img src=\"./img/u77.png\" alt=\"\">\n                                <span>\u65B0\u6D6A\u5FAE\u535A</span>\n                            </a>\n                        </li>\n                    </ul>\n                </li> \n                <li class=\"fl\">\n                    <ul>\n                        <li><a href=\"#\">\u53CB\u60C5\u94FE\u63A5</a></li>\n                        <li><a href=\"#\">\u56FD\u5BB6\u65C5\u6E38\u5C40</a></li>\n                        <li><a href=\"#\">\u8D35\u5DDE\u7701\u4EBA\u6C11\u653F\u5E9C</a></li>\n                        <li><a href=\"#\">\u4E16\u754C\u65C5\u6E38\u7EC4\u7EC7</a></li>\n                        <li><a href=\"#\">\u4E2D\u56FD\u5C71\u5730\u8054\u5408\u4F1A</a></li>\n                        <li><a href=\"friendship_links.html\">\u66F4\u591A>></a></li>\n                    </ul>\n                </li>         \n            </ul>\n            <div class=\"footer-info\">\n                <div>\n                    <span>\u56FD\u9645\u5C71\u5730\u65C5\u6E38\u8054\u76DF\u7248\u6743\u6240\u6709@2018 </span><a><span>\u4EACICP\u590712025925\u53F7 </span></a>\n                </div>\n                <div>\n                    <span><a href=\"http://www.exmail.qq.com\" target=\"_blank\">\u90AE\u7BB1\u767B\u5F55</a></span><span><a href=\"#\">\u4F1A\u8BAE\u7CFB\u7EDF</a></span>\n                </div>\n            </div>\n        </div>\n        \n    </div>\n");

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

layui.use("form", function () {
    var form = layui.form;
    form.on("select(language)", function (data) {
        if (data.value == "0") {
            window.location.href = "./EN/index.html";
        } else {
            window.location.href = "./index.html";
        }
    });
});

// 图片hover时局部放大
$(".img-container").css({ overflow: "hidden" });
$(".img-container img").css({ transition: "all 0.6s" });
$(".img-container img").hover(function () {
    console.log("i am img");
    $(this).css({ transform: "scale(1.2)" });
    $(this).parent().css("height", $(this).css("height"));
    $(this).parent().css("width", $(this).css("width"));
}, function () {
    $(this).css({ transform: "scale(1)" });
    $(this).parent().css("height", $(this).css("height"));
    $(this).parent().css("width", $(this).css("width"));
});

$(".search_").click(function () {
    window.location.href = "search.html";
});
