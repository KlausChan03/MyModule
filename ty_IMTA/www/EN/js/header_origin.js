document.write(`<script src="./js/jquery-1.11.1.min.js"></script>`)
document.write(`<script src="./js/judge_browser.js"></script>`)
document.write('<script src="./template/layui/layui.js"></script>');

document.write(`
<div class="header header-EN">
        <div class="header-main">
            <div class="clearfloat">
                <div class="ic-symbol fl">
                    <img src="./img/u0.jpg" alt="">
                </div>
                <div class="header-login fr">
                    <input id="input_" type="text" placeholder="keyword">
                    <i class="search_"><img src="./img/u232.png"/></i>
                </div>
            </div>            
        </div>                             
        <div class="header-nav">
            <div class="clearfloat">
                <ul class="header-nav-ul clearfloat layui-nav bgc-0d7 fl" lay-filter="">
                    <li class="header-nav-item layui-nav-item page-index"><a href="index.html">Home</a></li>    
                    <li class="header-nav-item layui-nav-item page-about">
                        <a href="javascript:void(0);">About us</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="about_us.html">About us</a></dd>
                            <dd><a href="about_organization.html">Organization</a></dd>
                            <dd><a href="about_leader.html">Leader</a></dd>
                            <dd><a href="about_contact.html">Contact Us</a></dd>
                        </dl>
                    </li> 
                    <li class="header-nav-item layui-nav-item page-news">
                        <a href="javascript:void(0);">News</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="news_league.html">Alliance news</a></dd>                                               
                            <dd><a href="news_member.html">Member news</a></dd>
                            <dd><a href="news_industry.html">Industry news</a></dd>
                            <dd><a href="news_conversation.html">Dialogue interview</a></dd>
                            <dd><a href="news_picture.html">Picture information</a></dd>
                            
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-activity">
                        <a href="javascript:void(0);">Activities</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                         <dd><a href="activity_league.html">Alliance activity</a></dd>  
                            <dd><a href="activity_member.html">Membership activities</a></dd>
                            <dd><a href="activity_industry.html">Industry activities</a></dd>                        
                            <dd><a href="activity_topic.html">Thematic activities</a></dd>
                        </dl>
                    </li>     

                    <li class="header-nav-item layui-nav-item page-member">
                        <a href="javascript:void(0);">Member Services</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="member_service.html">Service Introduction</a></dd>
                            <dd><a href="member_list.html">Member Directory</a></dd>                            
                            <dd><a href="member_join.html">Join process</a></dd>   
                            <dd><a href="member_train.html">Training consultation</a></dd>                                                     
                            <dd><a href="member_elegant.html">Members' demeanor</a></dd>
                        </dl>
                    </li>    
                    <li class="header-nav-item layui-nav-item page-study">
                        <a href="javascript:void(0);">Research</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="study_report.html">research report</a></dd>
                            <dd><a href="study_standard.html">Authentication</a></dd>
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-party">
                        <a href="javascript:void(0);">Annual meeting</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="party_thisYear.html">2018 meeting</a></dd>
                            <dd><a href="party_formerYear.html">Previous annual meeting</a></dd>
                        </dl>
                    </li>     
                    <li class="header-nav-item layui-nav-item page-media">
                        <a href="javascript:void(0);">Media Center</a>
                        <dl class="header-nav-childItem layui-nav-child"> 
                            <dd><a href="media_center.html">Alliance material</a></dd>
                            <dd><a href="media_Ebook.html">Alliance Journal</a></dd>
                        </dl>
                    </li>    
                    <li class="header-nav-item layui-nav-item page-forum"><a href="javascript:void(0);">Common Libraries</a></li>                        
                </ul>
                <form class="header-nav-select layui-form fr">
                    <select name="language" lay-filter="language">
                        <option value="0">English</option>   
                        <option value="1">中文</option>                                             
                    </select>
                </form>

            </div>            
        </div>
    </div>
`)
