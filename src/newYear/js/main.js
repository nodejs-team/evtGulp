/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    var resData = {
        "groups":[
            {
                "keys":"top_bg_jpg,arrow_down_png,arrow1_png,arrow2_png,arrow3_png,arrow4_png,blighter1_png,blighter2_png,blighter3_png,box_png,box2_png,buy-btn_png,color_text_png,d4_png,d5_png,dc1_png,dc2_png,dc3_png,dc5_png,mask_svg,mask_bg_jpg,mask_text_png,mgo_png,q1_png,q3_png,q4_png,q5_png,q6_png,q7_png,q8_png,spoon_png,spoon2_png,spoon3_png,t_price_png,text1_png,text2_png,text3_png,text4_png,text5_png,title_png,title_dc_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"top_bg_jpg",
                "type":"image",
                "url":"top_bg.jpg"
            },
            {
                "name":"arrow_down_png",
                "type":"image",
                "url":"arrow_down.png"
            },
            {
                "name":"arrow1_png",
                "type":"image",
                "url":"arrow1.png"
            },
            {
                "name":"arrow2_png",
                "type":"image",
                "url":"arrow2.png"
            },
            {
                "name":"arrow3_png",
                "type":"image",
                "url":"arrow3.png"
            },
            {
                "name":"arrow4_png",
                "type":"image",
                "url":"arrow4.png"
            },
            {
                "name":"blighter1_png",
                "type":"image",
                "url":"blighter1.png"
            },
            {
                "name":"blighter2_png",
                "type":"image",
                "url":"blighter2.png"
            },
            {
                "name":"blighter3_png",
                "type":"image",
                "url":"blighter3.png"
            },
            {
                "name":"box_png",
                "type":"image",
                "url":"box.png"
            },
            {
                "name":"box2_png",
                "type":"image",
                "url":"box2.png"
            },
            {
                "name":"buy-btn_png",
                "type":"image",
                "url":"buy-btn.png"
            },
            {
                "name":"color_text_png",
                "type":"image",
                "url":"color_text.png"
            },
            {
                "name":"d4_png",
                "type":"image",
                "url":"d4.png"
            },
            {
                "name":"d5_png",
                "type":"image",
                "url":"d5.png"
            },
            {
                "name":"dc1_png",
                "type":"image",
                "url":"dc1.png"
            },
            {
                "name":"dc2_png",
                "type":"image",
                "url":"dc2.png"
            },
            {
                "name":"dc3_png",
                "type":"image",
                "url":"dc3.png"
            },
            {
                "name":"dc5_png",
                "type":"image",
                "url":"dc5.png"
            },
            {
                "name":"mask_svg",
                "type":"bin",
                "url":"mask.svg"
            },
            {
                "name":"mask_bg_jpg",
                "type":"image",
                "url":"mask_bg.jpg"
            },
            {
                "name":"mask_text_png",
                "type":"image",
                "url":"mask_text.png"
            },
            {
                "name":"mgo_png",
                "type":"image",
                "url":"mgo.png"
            },
            {
                "name":"q1_png",
                "type":"image",
                "url":"q1.png"
            },
            {
                "name":"q3_png",
                "type":"image",
                "url":"q3.png"
            },
            {
                "name":"q4_png",
                "type":"image",
                "url":"q4.png"
            },
            {
                "name":"q5_png",
                "type":"image",
                "url":"q5.png"
            },
            {
                "name":"q6_png",
                "type":"image",
                "url":"q6.png"
            },
            {
                "name":"q7_png",
                "type":"image",
                "url":"q7.png"
            },
            {
                "name":"q8_png",
                "type":"image",
                "url":"q8.png"
            },
            {
                "name":"spoon_png",
                "type":"image",
                "url":"spoon.png"
            },
            {
                "name":"spoon2_png",
                "type":"image",
                "url":"spoon2.png"
            },
            {
                "name":"spoon3_png",
                "type":"image",
                "url":"spoon3.png"
            },
            {
                "name":"t_price_png",
                "type":"image",
                "url":"t_price.png"
            },
            {
                "name":"text1_png",
                "type":"image",
                "url":"text1.png"
            },
            {
                "name":"text2_png",
                "type":"image",
                "url":"text2.png"
            },
            {
                "name":"text3_png",
                "type":"image",
                "url":"text3.png"
            },
            {
                "name":"text4_png",
                "type":"image",
                "url":"text4.png"
            },
            {
                "name":"text5_png",
                "type":"image",
                "url":"text5.png"
            },
            {
                "name":"title_png",
                "type":"image",
                "url":"title.png"
            },
            {
                "name":"title_dc_png",
                "type":"image",
                "url":"title_dc.png"
            }]
    };

    $.extend($.easing, {
        easeInCubic:function(e,f,a,h,g){
            return h*(f/=g)*f*f+a;
        },
        easeOutCubic: function(e,f,a,h,g){
            return h*((f=f/g-1)*f*f+1)+a;
        }
    });

    var aniMap = {
        "slide-left": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: el.offsetWidth*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-right": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-down-l": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.3,
                marginTop: -el.offsetHeight*0.8
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-down-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: el.offsetWidth*0.15,
                marginTop: -el.offsetHeight*0.8
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-up-l": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-up-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        },
        "slide-up": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                //marginRight: -el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    // marginRight: 0,
                    marginTop: 0
                }, 1000, 'easeOutCubic', cb);
            }, delay);

        },
        "fade-in": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1
                }, 800, cb);
            }, delay);
        }
    };

    var isSupportCss3 = (function(){
        var ret = /MSIE (\d+\.\d+)/.exec(navigator.userAgent);
        if( !ret || ret[1] > 9 ){
            return true;
        }
        return false;
    })();

    var setAnimate = function(el, hasDelay){
        var anim = el.getAttribute('data-anim');
        var delay = Number(el.getAttribute('data-delay')||0)*1000;
        var delayAdjust = Number(el.getAttribute('data-delay-adjust')||0)*1000;
        var chain = el.getAttribute('data-chain');

        delay = hasDelay ? delay : 0;
        delay += delayAdjust;

        if( isSupportCss3 ){
            var chainHandle = function(){
                $(chain).each(function(){
                    setAnimate(this, true);
                });
                el.removeEventListener('webkitAnimationEnd', chainHandle, false);
                el.removeEventListener('animationend', chainHandle, false);
            };

            el.className = [el.className, anim].join(" ");
            el.style['-webkit-animation-delay'] = delay + "ms";
            el.style['animationDelay'] = delay + "ms";
            if( chain ) {
                el.addEventListener('webkitAnimationEnd', chainHandle, false);
                el.addEventListener('animationend', chainHandle, false);
            }
        } else {
            if( aniMap[anim] ) {
                aniMap[anim].call(el, el, delay, function(){
                    if( chain ) {
                        $(chain).each(function(){
                            setAnimate(this, true);
                        });
                    }
                });
            }
        }
    };

    var setAllAnimate = function(container){
        $(container).find("[data-anim]").each(function(){
            setAnimate(this);
        });
    };

    var bindScroll = function( container ){

        var checkOffset = 0;
        var $win = $(window);
        var winHeight = $win.height();
        var elems = $(container).find('[data-anim]');
        var elemObj = [];

        elems.each(function(){
            elemObj.push({
                $elem: $(this),
                anim: this.getAttribute('data-anim'),
                scrollTop: $(this).offset().top,
                checkOffset: Number(this.getAttribute('data-offset')),
                isAnimated: false
            });
        });

        $win.on('scroll', function(){
                var scrollTop = $win.scrollTop();
                var docHeight = document.documentElement.clientHeight;

                $.each(elemObj, function(i, obj){
                    if( !obj.isAnimated ) {
                        if( obj.$elem[0].getAttribute('data-ignore') ){
                            obj.isAnimated = true;
                            return;
                        }
                        if (scrollTop + docHeight - checkOffset - obj.checkOffset > obj.scrollTop) {
                            setAnimate(obj.$elem[0], obj.scrollTop < winHeight);
                            obj.isAnimated = true;
                        }
                    }
                });
            })
            .trigger('scroll');
    };

    Function.prototype.bind = Function.prototype.bind || function(){
        var self = this,
            context = [].shift.call(arguments),
            args = [].slice.call(arguments);
        return function(){
            return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        }
    };

    var loadResource = function(){

        var loadComplete = function () {
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            correctPNG($('#evt_container').get(0));
            bindScroll('#evt_container');
        };
        var loader = new Resource.loadGroup("preload", resData);
        var spin = Resource.el('#evt_spin');

        loader.on("progress", function (loaded, total) {
            spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });

        loader.on("complete", loadComplete);
    };

    var correctPNG = function(container){
        var arVersion = navigator.appVersion.split("MSIE");
        var version = parseFloat(arVersion[1]);
        if (version && (version >= 5.5 && version < 9) && (document.body.filters)) {
            var lee_i = 0;
            var docimgs=container.getElementsByTagName('img');
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
    };

    $(function(){
        loadResource();
    });

    if( navigator.userAgent.indexOf("Edge") != -1 ){
        document.body.className += "browser-edge";
    }

})(jQuery);