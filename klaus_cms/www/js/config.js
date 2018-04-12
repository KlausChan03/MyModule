require.config({
  baseUrl: "/js/",
  paths: {
    //template层
    layui: "/template/layui/layui",

    //暂时不能调用
    // wangEditor: "/template/wangeditor/wangEditor.min",
    // oss: "http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min",  
    
    //lib层
    jquery: "lib/jquery.min",
    init: "lib/init",
    jquery_MD5: "lib/jquery.md5",
    common: "lib/common",
    chart: "lib/highcharts",

    //ui层
    ui_login: "ui/ui_login",
    ui_index: "ui/ui_index",
    ui_main: "ui/ui_main",
    ui_leftNav: "ui/ui_leftNav",
    ui_user: "ui/ui_user",
    canvas_login: "ui/canvas_login",
    func_formControl: "ui/func_formControl",
    func_tableButton: "ui/func_tableButton",
    func_tableInit: "ui/func_tableInit",
    func_layer: "ui/func_layer",

    // 系统
    user_list: "ui/user_list",
    user_power: "ui/user_power",
    
    // 会员账户
    show_member: "ui/show/show_member",
    show_memberInfo: "ui/show/show_memberInfo",
    show_publishMsg: "ui/show/show_publishMsg",
    show_upvote: "ui/show/show_memberInfo",
    show_comment: "ui/show/show_comment",
    show_focus: "ui/show/show_focus",
    show_collect: "ui/show/show_collect",
    show_liveRecord: "ui/show/show_liveRecord",
    show_liveWatchRecord: "ui/show/show_liveWatchRecord",
    show_liveSetting: "ui/show/show_liveSetting",
    show_group: "ui/show/show_group",
    show_groupMember: "ui/show/show_groupMember",
    show_groupSign: "ui/show/show_groupSign",
    show_groupChatInfo: "ui/show/show_groupChatInfo",
    show_groupActionRecord: "ui/show/show_groupActionRecord",
    show_friend: "ui/show/show_friend",
    show_friendMsg: "ui/show/show_friendMsg",
    show_friendActionRecord: "ui/show/show_friendActionRecord",
    show_smsInfo: "ui/show/show_smsInfo",
    show_msgStatus: "ui/show/show_msgStatus",
    show_smsModel: "ui/show/show_smsModel",
    show_deviceManage: "ui/show/show_deviceManage",
    show_versionControl: "ui/show/show_versionControl",
    show_loginDeviceManage: "ui/show/show_loginDeviceManage",
    show_overseasCode: "ui/show/show_overseasCode",
    show_logging: "ui/show/show_logging"

  },
  map: {
    "*": {
      css: "lib/css"
    }
  },
  shim: {
    // layui: ["css!/template/layui/css/layui.css","css!/css/main.css","css!/css/layer-set-myself.css"],
    func_layer: ["css!/css/layer-set-myself.css", "layui"],
    jquery_MD5: ["jquery"],
    common: ["jquery"],
    func_tableButton: ["common","layui"],
    func_formControl: ["common","layui"],
    func_tableInit: ["common","layui"],

    // 具体页面调用
    ui_login:["layui","jquery", "common","canvas_login","jquery_MD5"],
    ui_index:["layui", "jquery","ui_leftNav","common"],
    ui_main:["layui", "jquery","ui_leftNav","common","chart"],
    ui_user:["layui", "jquery","ui_leftNav","common","jquery_MD5"],

    user_list: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    user_power: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],

    show_member: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_memberInfo: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_publishMsg: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_upvote: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_comment: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_focus: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_collect: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_liveRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_liveWatchRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_liveSetting: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_group: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_groupMember: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_groupSign: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_groupChatInfo: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_groupActionRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_friend: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_friendMsg: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_friendActionRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_smsInfo: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_msgStatus: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_smsModel: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_deviceManage: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_versionControl: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_loginDeviceManage: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_overseasCode: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    show_logging: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ]
    
  }
});