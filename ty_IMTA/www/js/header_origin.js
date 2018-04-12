document.write(`<script src="./js/jquery-1.11.1.min.js"></script>`)
document.write(`<script src="./js/judge_browser.js"></script>`)
document.write('<script src="./template/layui/layui.js"></script>');

document.write(`
<div class="header">
        <div class="header-main">
            <div class="clearfloat">
                <div class="ic-symbol fl">
                    <img src="./img/u0.jpg" alt="">
                </div>
                <div class="header-login fr">
                    <input id="input_" type="text" placeholder="请输入搜索关键词">
                    <i class="search_"><img src="./img/u232.png"/></i>
                    <span><a href="#">登陆</a></span>
                    <span><a href="#">新用户注册</a></span>
                </div>
            </div>            
        </div>
        <div class="header-nav">
            <div class="clearfloat">
                <ul class="header-nav-ul clearfloat layui-nav bgc-0d7 fl" lay-filter="">
                    <li class="header-nav-item layui-nav-item page-index"><a href="index.html">首页</a></li>     
                    <li class="header-nav-item layui-nav-item page-news">
                        <a href="javascript:void(0);">联盟资讯</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="news_league.html">联盟资讯</a></dd>
                            <dd><a href="news_member.html">会员资讯</a></dd>
                            <dd><a href="news_industry.html">行业新闻</a></dd>
                            <dd><a href="news_conversation.html">对话访谈</a></dd>
                            <dd><a href="news_picture.html">图片资讯</a></dd>
                            
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-activity">
                        <a href="javascript:void(0);">近期活动</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="activity_league.html">联盟活动</a></dd>
                            <dd><a href="activity_member.html">会员活动</a></dd>
                            <dd><a href="activity_industry.html">行业活动</a></dd>
                            <dd><a href="activity_topic.html">专题活动</a></dd>
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-member">
                        <a href="javascript:void(0);">会员服务</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="member_service.html">服务介绍</a></dd>
                            <dd><a href="member_join.html">入会流程</a></dd>                            
                            <dd><a href="member_list.html">会员名录</a></dd>
                            <dd><a href="member_elegant.html">会员风采</a></dd>
                            <dd><a href="member_train.html">培训咨询</a></dd>
                        </dl>
                    </li>    
                    <li class="header-nav-item layui-nav-item page-study">
                        <a href="javascript:void(0);">学术研究</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="study_report.html">研究报告</a></dd>
                            <dd><a href="study_standard.html">标准认证</a></dd>
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-party">
                        <a href="javascript:void(0);">联盟年会</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="party_thisYear.html">2018年会</a></dd>
                            <dd><a href="party_formerYear.html">历届年会</a></dd>
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-picture"><a href="javascript:void(0);">共享图库</a></li>      
                    <li class="header-nav-item layui-nav-item page-media">
                        <a href="javascript:void(0);">媒体中心</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="media_center.html">联盟资料</a></dd>
                            <dd><a href="media_Ebook.html">联盟期刊</a></dd>
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-forum"><a href="javascript:void(0);">社区论坛</a></li>    
                    <li class="header-nav-item layui-nav-item page-about">
                        <a href="javascript:void(0);">关于我们</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="about_us.html">关于我们</a></dd>
                            <dd><a href="about_organization.html">组织机构</a></dd>
                            <dd><a href="about_leader.html">联盟领导</a></dd>
                            <dd><a href="about_contact.html">联系我们</a></dd>
                        </dl>
                    </li>
                </ul>
                <form class="header-nav-select layui-form fr">
                    <select name="language_" lay-filter="language">
                        <option value="1">中文</option>    
                        <option value="0">English</option>                       
                    </select>
                </form>

            </div>            
        </div>
    </div>
`)



