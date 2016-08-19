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
		length = list.length,
		imgObj = list[index];

	onLoad(list[index].src, function( imgEl ){
		progress && progress(++index, length, imgObj);
		if( index > length - 1 )
			return;
		onLoad((imgObj=list[index]).src, arguments.callee);
	});
};

var getLoadingImgs = function( container ){
	var imgContainer = document.getElementById(container);

	var imgs = imgContainer.getElementsByTagName('img');
	var imgObj = [];
	for(var i=0; i<imgs.length; i++){
		imgObj.push({
			elm: imgs[i],
			src: imgs[i].getAttribute('data-src')
		});
	}

	return imgObj;
}

