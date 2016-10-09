var server = "http://lamonth5.geemedia.com.cn/wechat/controller";
/**
 * 设置firendId
 * @param {Object} firendId
 */
function setFirendId(firendId) {
	window.sessionStorage.lamont_firendId = firendId;
}

function getFirendId() {
	return window.sessionStorage.lamont_firendId;
}

function setMyId(userId) {
	return window.sessionStorage.myId = userId;
}

function getMyId() {
	return window.sessionStorage.myId;
}

function setOpenId(openId) {
	return window.sessionStorage.lamont_openId = openId;
}

function getOpenId() {
	return window.sessionStorage.lamont_openId;
}

function getParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return null;
}

function saveUser(openId, nickname, headimgurl) {
	$.ajax({
		type:"post",
		url:server + "/olympic/insertUser",
		data:{openId:openId, nickname:nickname, headimgurl:headimgurl},
		async:true,
		success:function(data) {
			var response = eval(data);
			if (response.success) {
				var inHtml = response.data.inHtml;
				var userId = response.data.userId;
				setMyId(userId);
				window.location.href = inHtml;
			} else {
				alert(response.message);
			}
		}
	});
}
