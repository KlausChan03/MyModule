layui.config({
  base: "js/"
}).use(['form', 'layer'], function () {
  var verifyCode = new GVerify("v_container");
  var form = layui.form,
    layer = parent.layer === undefined ? layui.layer : parent.layer,
    $ = layui.jquery;
    
  //video背景
  $(window).resize(function () {
    // console.log($(window).width())
    // console.log($(".video-player").width())
    if ($(".video-player").width() > $(window).width()) {
      $(".video-player").css({ "height": $(window).height(), "width": "auto" });
    } else {
      $(".video-player").css({ "width": $(window).width(), "height": "auto" });
    }
  }).resize();

  //登录按钮事件
  form.on("submit(login)", function (e) {
//  stopDefault(e);
    var flag = verifyCode.validate(document.getElementById("code_input").value);
    var username = $(".username").val();
    var password_o = $(".password").val();
    var password = $.md5(password_o);    
    var code_input = $("#code_input").val();
    console.log(password,"llkk")
    if (username == "" || password_o == "") {
      layer.alert("账号和密码不能为空", { icon: 5, title: "登陆" });  
      return false;
    } 
    // else if (code_input == "") {
    //   layer.alert("验证码不能为空", { icon: 5, title: "登陆" });     
    //   return false;
    // } 
    // else if (!flag) {
    //   layer.alert("验证码错误", { icon: 5, title: "登陆" }); 
    //   $("#code_input").val(""); 
    //   return false;
    // } 
    // else if (flag) {
    else{
      var obj_save = {
        datas: { 用户名: username, 密码: password },
        func: "login"
      };
      var success_func = function (res) {
        // layer.alert(res.状态, { icon: 6, title: "登陆" });
        window.location.href = "../../index.html";
//      return false;
      };
      var error_func = function (res) {
        layer.alert(res.状态, { icon: 5, title: "登陆" });
//      return false;
      };
      ajax.ajax_common(obj_save, success_func, error_func);
      
      // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
      // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
      // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
      //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      // window.location.href = "../../index.html";
         return false;
    }
  });
});

!(function (window, document) {
  function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
    this.options = { //默认options参数值
      id: "", //容器Id
      canvasId: "verifyCanvas", //canvas的ID
      width: "100", //默认canvas宽度
      height: "30", //默认canvas高度
      type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
      code: ""
    }

    if (Object.prototype.toString.call(options) == "[object Object]") {//判断传入参数类型
      for (var i in options) { //根据传入的参数，修改默认参数值
        this.options[i] = options[i];
      }
    } else {
      this.options.id = options;
    }

    this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
    // this.options.letterArr = getAllLetter();

    this._init();
    this.refresh();
  }

  GVerify.prototype = {
    /**版本号**/
    version: '1.0.0',

    /**初始化方法**/
    _init: function () {
      var con = document.getElementById(this.options.id);
      var canvas = document.createElement("canvas");
      this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
      this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
      canvas.id = this.options.canvasId;
      canvas.width = this.options.width;
      canvas.height = this.options.height;
      canvas.style.cursor = "pointer";
      canvas.innerHTML = "您的浏览器版本不支持canvas";
      con.appendChild(canvas);
      var parent = this;
      canvas.onclick = function () {
        parent.refresh();
      }
    },

    /**生成验证码**/
    refresh: function () {
      this.options.code = "";
      var canvas = document.getElementById(this.options.canvasId);
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
      } else {
        return;
      }

      ctx.textBaseline = "middle";

      ctx.fillStyle = randomColor(180, 240);
      ctx.fillRect(0, 0, this.options.width, this.options.height);

      // if (this.options.type == "blend") { //判断验证码类型
      //   var txtArr = this.options.numArr.concat(this.options.letterArr);
      // } else if (this.options.type == "number") {
      //   var txtArr = this.options.numArr;
      // } else {
      //   var txtArr = this.options.letterArr;
      // }
      if (this.options.type == "blend"){
        var txtArr = this.options.numArr;
      }else{
        var txtArr = this.options.numArr;
      }

      for (var i = 1; i <= 4; i++) {
        var txt = txtArr[randomNum(0, txtArr.length)];
        this.options.code += txt;
        ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px SimHei'; //随机生成字体大小
        ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色		
        ctx.shadowOffsetX = randomNum(-3, 3);
        ctx.shadowOffsetY = randomNum(-3, 3);
        ctx.shadowBlur = randomNum(-3, 3);
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        var x = this.options.width / 5 * i;
        var y = this.options.height / 2;
        var deg = randomNum(-30, 30);
        /**设置旋转角度和坐标原点**/
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 0, 0);
        /**恢复旋转角度和坐标原点**/
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }
      /**绘制干扰线**/
      // for (var i = 0; i < 4; i++) {
      //   ctx.strokeStyle = randomColor(40, 180);
      //   ctx.beginPath();
      //   ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
      //   ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
      //   ctx.stroke();
      // }
      /**绘制干扰点**/
      for (var i = 0; i < this.options.width / 4; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    },

    /**验证验证码**/
    validate: function (code) {
      var code = code.toLowerCase();
      var v_code = this.options.code.toLowerCase();
      if (code == v_code) {
        return true;
      } else {
        this.refresh();
        return false;
      }
    }
  }
  /**生成字母数组**/
  // function getAllLetter() {
  //   var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z";
  //   return letterStr.split(",");
  // }
  /**生成一个随机数**/
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  /**生成一个随机色**/
  function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  window.GVerify = GVerify;
})(window, document);

