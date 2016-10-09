// JavaScript Document

$(function(){
	eleSize();
});

//事件设定
var isMobile = 'ontouchend' in document;
var events = {
	start: isMobile ? "touchstart" : "mousedown",
	move: isMobile ? "touchmove" : "mousemove",
	end: isMobile ? "touchend" : "mouseup"
};

if(isMobile){
	$.fn.click = function(callback){
		return this.on(events.end, callback);	
	};	
}

//loading
var onLoad = function( src, callback ){
	var img = new Image();
	img.onload = function(){
		img.onload = new Function;
		callback && callback( img );
	};
	img.onerror = function(){
		img.onerror = new Function;
		callback && callback( img );
	};
	img.src = src;
};
var loadImgQueue = function( list, progress ){
	if( !(list instanceof Array) ){
		list = list.split(",");	
	}
	var index = 0,
		length = list.length;
	
	onLoad(list[index], function( imgEl ){
		progress && progress(++index, length, imgEl);
		if( index > length - 1 )
			return;
		onLoad(list[index], arguments.callee);
	});
};


//元素尺寸控制
function eleSize(){
	$("body").height(window.innerHeight);
	$("section").height(window.innerHeight);
}

//获取url字段
function getParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return null;
}