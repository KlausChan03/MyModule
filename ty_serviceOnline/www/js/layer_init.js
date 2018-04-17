
layui.define(function(exports){ 
  layui.use(['jquery'],function(){
  var $ = layui.$;
  //触发事件
  var active = {
      setTop: function(){
        var that = this; 
        //多窗口模式，层叠置顶
        layer.open({
          type: 2 //此处以iframe举例
          ,title: '当你选择该窗体时，即会在最顶端'
          ,area: ['390px', '260px']
          ,shade: 0
          ,maxmin: true
          ,offset: [ //为了演示，随机坐标
            Math.random()*($(window).height()-300)
            ,Math.random()*($(window).width()-390)
          ] 
          ,content: 'http://layer.layui.com/test/settop.html'
          ,btn: ['继续弹出', '全部关闭'] //只是为了演示
          ,yes: function(){
            $(that).click(); 
          }
          ,btn2: function(){
            layer.closeAll();
          }
          
          ,zIndex: layer.zIndex //重点1
          ,success: function(layero){
            layer.setTop(layero); //重点2
          }
        });
      }
      ,confirmTrans: function(){
        //配置一个透明的询问框
        layer.msg('大部分参数都是可以公用的<br>合理搭配，展示不一样的风格', {
          time: 20000, //20s后自动关闭
          btn: ['明白了', '知道了', '哦']
        });
      }
      ,notice: function(){
        //示范一个公告层
        layer.open({
          type: 1
          ,title: false //不显示标题栏
          ,closeBtn: false
          ,area: '300px;'
          ,shade: 0.8
          ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
          ,btn: ['火速围观', '残忍拒绝']
          ,btnAlign: 'c'
          ,moveType: 1 //拖拽模式，0或者1
          ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
          ,success: function(layero){
            var btn = layero.find('.layui-layer-btn');
            btn.find('.layui-layer-btn0').attr({
              href: 'http://www.layui.com/'
              ,target: '_blank'
            });
          }
        });
      }
      ,offset: function(othis){
        var type = othis.data('type')
        ,text = othis.text();
        
        layer.open({
          type: 1
          ,offset: type 
          ,id: 'layerDemo'+type //防止重复弹出
          ,content: '<div style="padding: 20px 100px;">'+ text +'</div>'
          ,btn: '关闭全部'
          ,btnAlign: 'c' //按钮居中
          ,shade: false //不显示遮罩
          ,yes: function(){
            layer.closeAll();
          }
        });
      },phoneTips: function(othis){
        var type = othis.data('type')
        ,text = othis.text()
        ,title = othis.data('title')
        ,itself = othis.data('itself');
        
        layer.open({
          type: 1
          ,offset: type 
          ,id: 'layerDemo' + type //防止重复弹出
          ,skin: `phoneTips phoneTips-${itself}`
          ,area: '300px'
          ,title:[`<div class="phoneTips-header"><span class="phoneTips-title"><span>${text}&nbsp;</span>来电${title}</span><div class="phoneTips-icon"><img src="../img/i-${itself}.png"></div></div>`]
          ,content: `<div class="phoneTips-container"><div class="phoneTips-bottom flex-hc-vc"><button class="phoneTips-getMore "><img src="../img/i-arrow-b.png"</button></div></div>`
          ,shade: false //不显示遮罩
          ,success: function(layero, index){       
            $(`.phoneTips-${itself} .phoneTips-container`).prepend(`<ul class="phoneTips-content">
            <li class="phoneTips-items flex-hb-vc"><span class="phoneTips-items-user">王先生</span><span class="phoneTips-items-num">13542888855</span><span class="phoneTips-items-type">4举报投诉</span></li>
            <li class="phoneTips-items flex-hb-vc"><span class="phoneTips-items-user">王先生</span><span class="phoneTips-items-num">13542888855</span><span class="phoneTips-items-type">4举报投诉</span></li>
            <li class="phoneTips-items flex-hb-vc"><span class="phoneTips-items-user">王先生</span><span class="phoneTips-items-num">13542888855</span><span class="phoneTips-items-type">4举报投诉</span></li>
            </ul>`)
            $(`.phoneTips-${itself} .phoneTips-getMore`).on('click',function(){
              $(this).hide();
              $(`.phoneTips-${itself} .phoneTips-content`).append(` <li class="phoneTips-items flex-hb-vc"><span class="phoneTips-items-user">王先生</span><span class="phoneTips-items-num">13542888855</span><span class="phoneTips-items-type">4举报投诉</span></li>`)
            })
          }
        });
      }
    }; 
    exports('layer_init', active);
  })
})