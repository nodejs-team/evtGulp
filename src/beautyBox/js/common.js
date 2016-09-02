function getServerUrl() {
	return "http://mbbh5.geemedia.com.cn/wechat/controller"
}

function getParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return null;
}

function setOpenid(openid) {
	if( openid ) {
		window.sessionStorage.app_openId = openid;
	} else {
		delete sessionStorage.app_openId;
	}
}

function getOpenid() {
	return window.sessionStorage.app_openId;
}

function setNickname(nickname) {
	if( nickname ) {
		window.sessionStorage.nickname = nickname;
	} else {
		delete sessionStorage.nickname
	}
}

function getNickname() {
	return window.sessionStorage.nickname;
}

function setHeadImgUrl(headImgUrl) {
	if( headImgUrl ) {
		window.sessionStorage.headimgurl = headImgUrl;
	} else {
		delete sessionStorage.headimgurl
	}
}

function getHeadImgUrl() {
	return window.sessionStorage.headimgurl;
}

function setParentId(parentId) {
	if( parentId ) {
		window.sessionStorage.app_parent_id = parentId;
	} else {
		delete sessionStorage.app_parent_id
	}
}

function getParentId() {
	return window.sessionStorage.app_parent_id;
}

function unicodeToUtf8(str) {
	return str == null ? "" : unescape(str.replace(/\\u/g, "%u")).trim();
}

function setUserId(userId) {
	if( userId ) {
		window.sessionStorage.app_user_id = userId;
	} else {
		delete sessionStorage.app_user_id;
	}
}

function getUserId() {
	return window.sessionStorage.app_user_id;
}

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

