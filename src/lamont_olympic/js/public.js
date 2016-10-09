var IP = "socialapi.geemedia.com.cn";//192.168.0.200//139.196.169.49 
var Port = "80";//8002//5901
var appId3 = "";
var timestamp3 = "";
var nonceStr3 = "";
var signature3 = "";

$.ajax({
    async: false,
    url: "http://" + IP + ":" + Port + "/api/WxAPI/WeixinJSSDK",
    type: "POST",
    contentType: "application/x-www-form-urlencoded",
    dataType: "json",
    cache: false,
    data: { "url": location.href },
    success: function (msg) {
        var obj = $.parseJSON(msg);
        timestamp3 = obj.result[0].timestamp;
        nonceStr3 = obj.result[0].nonceStr;
        signature3 = obj.result[0].signature;
        appId3 = obj.result[0].appId;
    }
});
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '' + appId3 + '', // 必填，公众号的唯一标识
    timestamp: '' + timestamp3 + '', // 必填，生成签名的时间戳
    nonceStr: '' + nonceStr3 + '', // 必填，生成签名的随机串
    signature: '' + signature3 + '',// 必填，签名
    jsApiList: [
          "checkJsApi",
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2。详见：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html 

});



 wx.ready(function () {

            var link ='http://lamonth5.geemedia.com.cn/wechat/pages/lamont_olympic/index.html?fid=' + getMyId();
	
            var imgUrl = 'http://cdn.geemedia.com.cn/lamont_olympic/images/share-icon.jpg';
            //转发到朋友圈
            wx.onMenuShareTimeline({
                title: '我在玩拉蒙红酒抢金牌，与大疆无人机只差最后一步，赶紧来帮我加分！',
                link: link,
                imgUrl: imgUrl,
                success: function () {
                    //alert('转发成功！');
					//location.href=location.href;
                    WXShareCallback(2);
                },
                cancel: function () {
                    //alert('转发失败！');
                }
            });
            //转发给朋友
            wx.onMenuShareAppMessage({
                title: '我与大疆无人机只差一步',
                desc: '我在玩拉蒙红酒抢金牌，与大疆无人机只差最后一步，赶紧来帮我加分！',
                link: link,
                imgUrl: imgUrl,
                type: 'link',
                dataUrl: '',
                success: function () {
                    //location.href=location.href;
                    WXShareCallback(1);
                },
                cancel: function () {
                    //alert('转发失败！');
                }
            });
            wx.hideAllNonBaseMenuItem();
            wx.hideMenuItems({
                menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
            wx.showMenuItems({
                menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
            });
        });