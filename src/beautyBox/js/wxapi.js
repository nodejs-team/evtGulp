function g_load_wexin_config(){
	var url = "http://mbbsocialapi.geemedia.com.cn:80/api/WxAPI/WeixinJSSDK";
	var urlParam = encodeURI(location.href.split('#')[0]);
	jQuery.ajax({
        url:url,
        type:"POST",
        cache: false,
		data: {url: location.href},
        dataType : "json",
        timeout:20000,
        success: function (data) {
        	data = eval("(" + data + ")");
            g_setup_weixin(data.result[0]);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

g_load_wexin_config();

function getShareLink() {
	return "http://cdn.geemedia.com.cn/beautyBox2/index.html?parentId=" + getUserId();
}

var isShare=0, username="";
function getShareDesc() {
	if(isShare==0){
		return "就只差你的一句BIBI了，还不快来！";
	} else {
		return "没想到TA在朋友的眼里是这样的人！";
	}
}

function getTitle() {
	if(isShare==0){
		return "来啊，互相伤害！千载难逢的机会，爱我就来BIBI我";
	}  else {
		return "快来围观"+username+"的专属BIBI盒！这吐槽，太辣眼！";
	}
}

function getShareImgUrl() {
	/*if(isShare==0){
		return "http://cdn.geemedia.com.cn/beautyBox2/images/icon1.jpg";
	} else {*/
		return "http://cdn.geemedia.com.cn/beautyBox2/images/icon2.jpg";
	//}
}

function getHost(){
	return "http://mbbh5.geemedia.com.cn";
}

//获取url字段
function getParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return null;
}

function g_setup_weixin(config){
	wx.config({
	    appId: config.appId,
	    timestamp: config.timestamp,
	    nonceStr: config.nonceStr,
	    signature: config.signature,
		debug: false,
	    jsApiList: [
	      // 所有要调用的 API 都要加到这个列表中
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'chooseImage',
			'previewImage',
			'uploadImage',
			'downloadImage'
	    ]
	});
	wx.ready(function () {
		//2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
		wx.onMenuShareAppMessage({
			title: getTitle(),
			desc: getShareDesc(),
			link: getShareLink(),
			imgUrl: getShareImgUrl(),
			trigger: function (res) {
				
			},
			success: function (res) {
				share(getUserId(), 1).always(function(){
					typeof shareCallback == 'function' && shareCallback(true, 1);
				});
			},
			cancel: function (res) {
				typeof shareCallback == 'function' && shareCallback(false, 1);
			},
			fail: function (res) {
				alert(JSON.stringify(res));
			}
		});

		//2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
		wx.onMenuShareTimeline({
			title: getTitle(),
			link: getShareLink(),
			imgUrl: getShareImgUrl(),
			trigger: function (res) {
				
			},
			success: function (res) {
				share(getUserId(), 2).always(function(){
					typeof shareCallback == 'function' && shareCallback(true, 2);
				});
			},
			cancel: function (res) {
				typeof shareCallback == 'function' && shareCallback(false, 2);
			},
			fail: function (res) {
				alert(JSON.stringify(res));
			}
		});
	});
	wx.error(function (res) {
		alert(res.errMsg);	  
	});
}
