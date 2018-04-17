document.write(`
    <header class="header flex-hb-vc">
        <div class="header-logo">
            <img src="./img/h-logo.png" alt="">
        </div>
        <div class="header-main flex-hb-vc">
            <div class="header-notice flex-ha-vc">
                <img src="./img/h-notice.png" alt="">
                <span>等待：
                    <span data-method="phoneTips" data-type="r" data-title="等待" data-itself="waiting" class="notice-act header-notice-waiting cold54">0</span>
                </span>
                <span>未接：
                    <span data-method="phoneTips" data-type="rt" data-title="未接" data-itself="unlisten" class="notice-act header-notice-unlisten cold54">12</span>
                </span>
                <span>已接：
                    <span class="notice-act header-notice-haslisten">0</span>
                </span>
            </div>
            <div class="header-use flex-v flex-hc-vr">
                <div class="header-use-top flex-hc-vc">
                    <span class="header-use-id">林少芳</span>
                    <span class="header-use-logOut flex-hc-vc">
                        <img src="./img/i-1.png" alt="">
                        <span>退出</span>
                    </span>
                </div>
                <div class="header-use-bottom">
                    <span>当前在线人数：
                        <span class="header-use-num">0</span>人</span>
                    <span>客服015已登录29线</span>
                </div>
            </div>
        </div>
    </header>
`);
