this.WXApi = function(){
	
	var getParameter = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return r[2]; return null;
	};
	
	var _extend = function(source, props){
		props = props || {};
		for( var i in props ){
			if( source.hasOwnProperty(i) ){
				source[ i ] = props[ i ];	
			}	
		}
		return source;
	};
	
	var setOption = function( option, succedFn, cancelFn ){
		var defs = {
			title: '', // 分享标题
			desc: '', // 分享描述
			link: '', // 分享链接
			imgUrl: '', // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { 
				// 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}	
		};

		_extend( defs, option );
		
		if( succedFn ){
			defs.success = succedFn;	
		}
		if( cancelFn ){
			defs.cancel = cancelFn;	
		}
		return defs;
	};
	
	//分享到朋友圏
	var shareToTimeline = function(){
		option = setOption.apply(null, arguments);
		option.title = option.desc;
		wx.onMenuShareTimeline(option);
	};
	
	//发送给朋友
	var sendToFriend = function(){
		option = setOption.apply(null, arguments);
		wx.onMenuShareAppMessage(option);
	};
	
	//发送至QQ
	var shareToQQ = function(){
		option = setOption.apply(null, arguments);
		wx.onMenuShareQQ(option);
	};
	
	//发送至微博
	var shareToWeibo = function(){
		option = setOption.apply(null, arguments);
		wx.onMenuShareWeibo(option);
	};
	
	//获取网络状态
	var getNetWork = function( callback ){
		wx.getNetworkType({
			success: function (res) {
				var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
				callback && callback( networkType );
			}
		});	
	};
	
	//扫描二维码
	var scanQRCode = function( callback ){
		wx.closeWindow();
		wx.scanQRCode({
			desc: 'scanQRCode desc',
			needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function (res) {
				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				callback && callback( result );
			}
		});
	};
	
	//获取地址位置
	var getLocation = function( callback ){
		wx.getLocation({
			success: function (res) {
				//var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
				//var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
				//var speed = res.speed; // 速度，以米/每秒计
				//var accuracy = res.accuracy; // 位置精度
				callback && callback( res );
			}
		});	
	};
	
	//通过微信打开地址位置
	var openLocation = function( option ){
		wx.openLocation(
			_extend({
				latitude: 0, // 纬度，浮点数，范围为90 ~ -90
				longitude: 0, // 经度，浮点数，范围为180 ~ -180。
				name: '', // 位置名
				address: '', // 地址详情说明
				scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
				infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
			}, option)
		);	
	};
	
	var jsApiList = [
			'checkJsApi',
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
		];
	
	var checkJsApi = function( jsApiList, callback ){
		wx.checkJsApi({
			jsApiList: jsApiList, // 需要检测的JS接口列表，所有JS接口列表详见jsApiList
			success: function(res) {
				// 以键值对的形式返回，可用的api值true，不可用为false
				// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				callback && callback( res );
			}
		});	
	};
	
	var isWeixin = function(){
		return this.__isWeiXin == undefined ? (this.__isWeiXin=/MicroMessenger/i.test(navigator.userAgent)) : this.__isWeiXin;	
	};
	
	var config = function( config ){
		if(config.jsApiList == undefined){
			config.jsApiList = jsApiList;	
		}
		wx.config(config);
	};
	
	var setConfig = function( proxy ){
		proxy = proxy || "/sypro/service/getWeiXinCode/getwxjsConfig?url=";
		proxy = proxy + encodeURIComponent(location.href.split("#")[0]);
		
		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			xhr.onload = new Function;
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				var res = eval(xhr.responseText);
				res = eval("("+ res +")");
				config(res); 	
			} else {
				console.log("WeiXin config get fail:" + xhr.status);	
			}
		};
		
		xhr.open("GET", proxy, true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.withCredentials = true;
		
		xhr.send(null);
	};
	
	if( isWeixin() ){
		setConfig();
	}
	
	return {
		ready: function( readyFn ){
			if( isWeixin() ){
				wx.ready(readyFn);
			} else {
				document.addEventListener('DOMContentLoaded', readyFn, false);	
			}
		},
		error: wx.error,
		checkJsApi: checkJsApi,
		shareToTimeline: shareToTimeline,
		sendToFriend: sendToFriend,
		shareToQQ: shareToQQ,
		shareToWeibo: shareToWeibo,
		getNetWork: getNetWork,
		scanQRCode: scanQRCode,
		getLocation: getLocation,
		openLocation: openLocation,
		hideOptionMenu: wx.hideOptionMenu,
		showOptionMenu: wx.showOptionMenu,
		closeWindow: wx.closeWindow,
		hideMenuItems: wx.hideMenuItems,
		showMenuItems: wx.showMenuItems,
		hideAllNonBaseMenuItem: wx.hideAllNonBaseMenuItem,
		showAllNonBaseMenuItem: wx.showAllNonBaseMenuItem,
		jsApiList: jsApiList,
		config: config,
		setConfig: setConfig,
		isWeixin: isWeixin,
		getParameter: getParameter
	};
}();

WXApi.setDesc = function( desc ){
	typeof window.shareData == 'object' && (window.shareData.desc = desc);
};

WXApi.setTitle = function( title ){
	typeof window.shareData == 'object' && (window.shareData.title = title);
};

WXApi.deploy = function( fnCallback ){
		
	//分享到朋友圏
	WXApi.shareToTimeline(window.shareData, function(){fnCallback(2)});
	
	//发送给朋友
	WXApi.sendToFriend(window.shareData, function(){fnCallback(1)});
	
	//发送至QQ
	WXApi.shareToQQ(window.shareData, function(){fnCallback(3)});
	
	//发送至微博
	WXApi.shareToWeibo(window.shareData, function(){fnCallback(4)});
};

WXApi.ready(function(){
	WXApi.deploy();					 
});

try{
	WXApi.error(function(res){
		alert("微信认证失败:"+ JSON.stringify(res));			  
	});
}catch(e){}