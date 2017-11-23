var Butterfly = {
    _canAnimateDown: true,
    _canAnimateUp: false,
    _canFade: true,
    pathA: {
        start: {x:65.18599700927734, y:1.685999870300293},
        end: {x:785.18603515625, y:465.2610168457031}
    },
    pathB:{
        start: {x:758, y:514.6220092773438},
        end: {x:801, y:1248}
    },
    init: function(){
        var self = this;

        this._isIE = !!document.all;
        this._ieVersion = this._getIEversion();
        this.client = this._getClient();
        this.butterfly = document.getElementById('butterfly');
        this.butterflyEl = this.butterfly.getElementsByTagName('div')[0];
        this.$container = $(".butterFly-wrap");
        this.cakes = this.$container.find("div[data-delay]");
        this.clientX = this.$container.offset().left;

        var w = this.client.clientW;

        if( w > 1280 && w < 1348 ){
            this.adjustX = 40;
        }
        else if( w < 1280 || w == 1280 ){
            this.adjustX = 50;
        }
        else {
            this.adjustX = 0;
        }

        this.doLayout();
        this.initEvents();

        if( !!window.ActiveXObject || "ActiveXObject" in window ){
            this.butterflyEl.className += " bf-el";
            this.playButterfly();
        }

        $(this.butterfly).delay(500).fadeIn('slow');
        this.setAnimateA();

        setTimeout(function(){
            self.doAnimateA();
        }, 2000);

    },
    _getClient: function(){
        var de = document.documentElement;
        var db = document.body;

        return {
            clientW: de.clientWidth || db.clientWidth || 0,
            clientH: de.clientHeight || db.clientHeight || 0,
            scrollTop: db.scrollTop || de.scrollTop || 0
        };
    },
    _getIEversion: function(){
        var ua = navigator.userAgent;
        var version = /MSIE (\d+\.\d+)/.exec(ua);
        if( version ){
            return parseFloat(version[1]);
        }

        return false;
    },
    doLayout: function() {
        if( this._ieVersion && this._ieVersion < 9 ){
            this.butterflyEl.className += " bf-el";
            this.butterfly.style.left = this.pathA.start.x + this.clientX - 20 + "px";
            this.butterfly.style.top = this.pathA.start.y + "px";
        } else {
            var path = document.getElementById('path_a');
            var point = path.getPointAtLength(0);

            this.butterfly.style.left = point.x - 10 + this.clientX + this.adjustX + "px";
            this.butterfly.style.top = point.y + 10 + "px";
        }

        //this.$container.height($("#svg_path").attr('height'));

        this.cakes.each(function(){
            var delay = Number(this.getAttribute('data-delay')) + 's';
            this.style.webkitAnimationDelay = delay;
            this.style.animationDelay = delay;
        });
    },
    playButterfly: function(){
        var self = this;
        var count = 0;
        var diff = 3;
        var index = 0;
        var reverse = false;
        var posAry = [2,86,185,270,344];

        self.butterflyEl.style.backgroundPositionX = -1*posAry[index] + 24 + "px";

        setInterval(function(){
            self.butterflyEl.style.backgroundPositionX = -1*posAry[index] + 24 + "px";

            count = (count+1)%4;
            diff = 3-count;

            if( count%4 == 0 ){
                reverse = !reverse;
            }

            if( !reverse ){
                index = count
            } else {
                index = diff;
            }

        }, 35);
    },
    setAnimateA: function(){
        var self = this;
        if( this._ieVersion && this._ieVersion < 10 ){
            for(var i=0; i<4; i++){
                setTimeout((function(i){
                    return function(){
                        var obj = {
                            opacity: 1
                        };
                        var cssObj = {};
                        var anmType = self.cakes.eq(i).attr('data-anim');
                        if( anmType == 'fly-down' ){
                            obj.marginTop = '0px';
                            cssObj.marginTop = '-250px';
                        }
                        if( anmType == 'fly-right' ){
                            obj.marginLeft = '0px';
                            cssObj.marginLeft = '200px';
                        }
                        if( anmType == 'fly-left' ){
                            obj.marginLeft = '0px';
                            cssObj.marginLeft = '-200px';
                        }
                        self.cakes.eq(i).css(cssObj).animate(obj, 600);
                    }
                })(i), Number(this.cakes.eq(i).attr("data-delay"))*1000 );
            }
        } else {
            this.cakes.slice(0, 4).each(function(){
                $(this).addClass(this.getAttribute("data-anim")||"fadeIn");
            });
        }
    },
    setAnimateB: function(){
        var self = this;

        if( this._ieVersion && this._ieVersion < 10 ){
            for(var i=4; i<14; i++){
                setTimeout((function(i){
                    return function(){
                        var obj = {
                            opacity: 1
                        };
                        var cssObj = {};
                        var anmType = self.cakes.eq(i).attr('data-anim');
                        if( anmType == 'fly-down' ){
                            obj.marginTop = '0px';
                            cssObj.marginTop = '-250px';
                        }
                        if( anmType == 'fly-right' ){
                            obj.marginLeft = '0px';
                            cssObj.marginLeft = '200px';
                        }
                        if( anmType == 'fly-left' ){
                            obj.marginLeft = '0px';
                            cssObj.marginLeft = '-200px';
                        }
                        self.cakes.eq(i).css(cssObj).animate(obj, 600);
                    }
                })(i), Number(this.cakes.eq(i).attr("data-delay"))*1000 );
            }
        } else {
            this.cakes.slice(4).each(function(){
                $(this).addClass(this.getAttribute("data-anim")||"fadeIn");
            });
        }
    },
    doAnimateA: function(){
        var self = this;
        if( this._ieVersion && this._ieVersion < 9 ){
            $(this.butterfly).animate({
                left: this.pathA.end.x - 30 + self.clientX,
                top: this.pathA.end.y
            }, 2000, function(){
                $(self.butterfly).css('z-index', 10);
            });
        } else {
            var path = document.getElementById('path_a');
            var pathLength = path.getTotalLength();

            var obj = {p: this.adjustX, x: -1};

            $(obj).animate({
                p: pathLength,
                x: 1
            }, {
                step: function () {
                    var point = path.getPointAtLength(obj.p);
                    self.butterfly.style.left = point.x - 10 + self.clientX + 'px';
                    self.butterfly.style.top = point.y + 10 + 'px';
                    if( !self._ieVersion || self._ieVersion > 9 ) {
                        self.butterflyEl.style.webkitTransform = 'perspective(750px) scale(2.8) rotate3d(1,' + obj.x + ',0,75deg) translate3d(0px,0px,0px)';
                        self.butterflyEl.style.transform = 'perspective(750px) scale(2.8) rotate3d(1,' + obj.x + ',0,75deg) translate3d(0px,0px,0px)';
                    }
                },
                duration: 2000,
                complete: function(){
                    $(self.butterfly).css('z-index', 10);
                }
            });
        }

    },
    doAnimateB: function(){
        var self = this;

        if( this._ieVersion && this._ieVersion < 9 ){
            $(this.butterfly).css({
                left: this.pathB.start.x - 30 + self.clientX,
                top: this.pathB.start.y
            }).animate({
                left: this.pathB.end.x,
                top: this.pathB.end.y - 30
            }, 2000);
        } else {

            var path = document.getElementById('path_b');
            var pathLength = path.getTotalLength();

            var obj = {p: 0, x: 1};

            $(obj).animate({
                p: pathLength,
                x: -1
            }, {
                step: function () {
                    var point = path.getPointAtLength(obj.p);
                    self.butterfly.style.left = point.x + self.clientX + 'px';
                    self.butterfly.style.top = point.y + 'px';
                    if( !self._ieVersion || self._ieVersion > 9 ) {
                        self.butterflyEl.style.webkitTransform = 'perspective(750px) scale(2.8) rotate3d(1,' + obj.x + ',0,75deg) translate3d(0px,0px,0px)';
                        self.butterflyEl.style.transform = 'perspective(750px) scale(2.8) rotate3d(1,' + obj.x + ',0,75deg) translate3d(0px,0px,0px)';
                    }
                },
                duration: 2000
            });
        }
    },

    reverseAnimateB: function(){
        var self = this;

        if( this._ieVersion && this._ieVersion < 9 ){
            $(this.butterfly).animate({
                left: this.pathB.start.x - 30 + self.clientX,
                top: this.pathB.start.y
            }, 2000);
        } else {
            var path = document.getElementById('path_b');
            var pathLength = path.getTotalLength();

            var obj = {p: pathLength, x: 1};

            $(obj).animate({
                p: 0,
                x: -1
            }, {
                step: function () {
                    var point = path.getPointAtLength(obj.p);
                    self.butterfly.style.left = point.x + self.clientX + 'px';
                    self.butterfly.style.top = point.y + 'px';
                    if( !self._ieVersion || self._ieVersion > 9 ) {
                        self.butterflyEl.style.webkitTransform = 'perspective(750px) scale(2.8) rotate3d(1,' + obj.x + ',0,75deg) translate3d(0px,0px,0px)';
                        self.butterflyEl.style.transform = 'perspective(750px) scale(2.8) rotate3d(1,' + obj.x + ',0,75deg) translate3d(0px,0px,0px)';
                    }
                },
                duration: 2000
            });
        }
    },

    getImgSize: function(src, fun){
        var obj = {};
        var img = new Image();
        img.onload = function(){
            obj.width = img.width;
            obj.height = img.height;
            fun && fun.call(img, obj);
            img.onload = null;
        };

        img.src = src;
    },

    initEvents: function(){
        var self = this;
        var initTop = this._getClient().scrollTop;

        $(window).scroll(function() {
            var scrollTop = self._getClient().scrollTop;

            if (scrollTop > initTop) {
                if (scrollTop > 280) {
                    if( self._canFade ){
                        self.setAnimateB();
                        self._canFade = false;
                    }

                    if (self._canAnimateDown) {
                        self.doAnimateB();
                        self._canAnimateDown = false;
                        self._canAnimateUp = true;
                    }
                }
            } else {
                if (scrollTop < 300) {
                    if (self._canAnimateUp) {
                        self.reverseAnimateB();
                        self._canAnimateUp = false;
                        self._canAnimateDown = true;
                    }
                }
            }

            if( self._isIE ){
                setTimeout(function(){
                    initTop = scrollTop;
                }, 0);
            } else {
                initTop = scrollTop;
            }

        });

        var imgSrc = "";
        var lastImg;
        var lastWidth;
        var lastHeight;
        var hasText = false;

        $(".cake-text").on("mouseenter", function(){
            if( self._ieVersion && self._ieVersion < 9 ){
                lastImg = this.getElementsByTagName('span')[0];
                imgSrc = this.getAttribute('data-src');
                lastWidth = parseFloat(lastImg.style.width);
                lastHeight =  parseFloat(lastImg.style.height);

                var hoverImg = imgSrc.replace(/\.png$/, "") + "-hover.png";
                self.getImgSize(hoverImg, function(size){
                    lastImg.style.width = size.width + "px";
                    lastImg.style.height = size.height + "px";
                    lastImg.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ hoverImg  + "', sizingMethod='scale')";
                });
            } else {
                lastImg = this.getElementsByTagName('img')[0];
                imgSrc = lastImg.getAttribute('src');
                lastImg.src = imgSrc.replace(/\.png$/, "") + "-hover.png";
            }
        }).on("mouseleave", function(){
            if( self._ieVersion && self._ieVersion < 9 ) {
                lastImg.style.width = lastWidth + "px";
                lastImg.style.height = lastHeight + "px";
                lastImg.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "', sizingMethod='scale')";
            } else {
                lastImg.src = imgSrc;
            }
        });

        $(".cake").mouseenter(function(){
            var cakeNum = /cake\d+/.exec(this.className)[0];
            var cakeText = $(".cake-text." + cakeNum + "-text");
            if( !cakeText.length ) {
                hasText = false;
                return;
            }

            if( self._ieVersion && self._ieVersion < 9 ){
                lastImg = cakeText.get(0).getElementsByTagName('span')[0];
                imgSrc = cakeText.get(0).getAttribute('data-src');
                lastWidth = parseFloat(lastImg.style.width);
                lastHeight =  parseFloat(lastImg.style.height);

                var hoverImg = imgSrc.replace(/\.png$/, "") + "-hover.png";
                self.getImgSize(hoverImg, function(size){
                    lastImg.style.width = size.width + "px";
                    lastImg.style.height = size.height + "px";
                    lastImg.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ hoverImg +"', sizingMethod='scale')";
                });
            } else {
                lastImg = cakeText.get(0).getElementsByTagName('img')[0];
                imgSrc = lastImg.getAttribute('src');
                lastImg.src = imgSrc.replace(/\.png$/, "") + "-hover.png";
            }
            hasText = true;

        }).mouseleave(function(){
            if( hasText ) {
                if( self._ieVersion && self._ieVersion < 9 ) {
                    lastImg.style.width = lastWidth + "px";
                    lastImg.style.height = lastHeight + "px";
                    lastImg.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "', sizingMethod='scale')";
                } else {
                    lastImg.src = imgSrc;
                }
            }
        });

    }
};

$(function(){
    //if (E.getCookie('cookie_city_id') && E.getCookie("cookie_temp_city_id")) {
        Butterfly.init();
    //}
});

function correctPNG() {
    var arVersion = navigator.appVersion.split("MSIE");
    var version = parseFloat(arVersion[1]);
    if ((version >= 5.5) && (document.body.filters)) {
        var lee_i = 0;
        var docimgs=document.images;
        for (var j = 0; j < docimgs.length; j++) {
            var img = docimgs[j];
            var imgName = img.src.toUpperCase();
            if (imgName.substring(imgName.length - 3, imgName.length) == "PNG" && !img.getAttribute("usemap")) {
                lee_i++;
                var SpanID = img.id || 'ra_png_' + lee_i.toString();
                var imgData = new Image();
                imgData.proData = SpanID;
                imgData.onload = function () {
                    $("#" + this.proData).css("width", this.width + "px").css("height", this.height + "px");
                }
                imgData.src = img.src;
                var imgID = "id='" + SpanID + "' ";
                var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                var imgStyle = "display:inline-block;" + img.style.cssText
                if (img.align == "left") imgStyle = "float:left;" + imgStyle
                if (img.align == "right") imgStyle = "float:right;" + imgStyle
                if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                var strNewHTML = "<span " + imgID + imgClass + imgTitle
                    + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                    + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                    + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                img.outerHTML = strNewHTML;
                j = j - 1;
            }
        }
    }
}
//判断是否为IE8及以下浏览器，其实除了这三个浏览器不支持addEventListener，其它浏览器都没问题
if (typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined") {
    window.attachEvent("onload", correctPNG);
}