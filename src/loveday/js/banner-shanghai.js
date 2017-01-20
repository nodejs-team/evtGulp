// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
}());

;(function(){
    var resData = {
        "groups":[
            {
                "keys":"bg_jpg,f1_png,f2_png,f3_png,f4_png,f5_png,f6_png,f7_png,f8_png,f9_png,f10_png,f11_png,f12_png,img_png,product_png,title_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"bg_jpg",
                "type":"image",
                "url":"shanghaibanner/bg.jpg"
            },
            {
                "name":"f1_png",
                "type":"image",
                "url":"shanghaibanner/f1.png"
            },
            {
                "name":"f2_png",
                "type":"image",
                "url":"shanghaibanner/f2.png"
            },
            {
                "name":"f3_png",
                "type":"image",
                "url":"shanghaibanner/f3.png"
            },
            {
                "name":"f4_png",
                "type":"image",
                "url":"shanghaibanner/f4.png"
            },
            {
                "name":"f5_png",
                "type":"image",
                "url":"shanghaibanner/f5.png"
            },
            {
                "name":"f6_png",
                "type":"image",
                "url":"shanghaibanner/f6.png"
            },
            {
                "name":"f7_png",
                "type":"image",
                "url":"shanghaibanner/f7.png"
            },
            {
                "name":"f8_png",
                "type":"image",
                "url":"shanghaibanner/f8.png"
            },
            {
                "name":"f9_png",
                "type":"image",
                "url":"shanghaibanner/f9.png"
            },
            {
                "name":"f10_png",
                "type":"image",
                "url":"shanghaibanner/f10.png"
            },
            {
                "name":"f11_png",
                "type":"image",
                "url":"shanghaibanner/f11.png"
            },
            {
                "name":"f12_png",
                "type":"image",
                "url":"shanghaibanner/f12.png"
            },
            {
                "name":"img_png",
                "type":"image",
                "url":"shanghaibanner/img.png"
            },
            {
                "name":"product_png",
                "type":"image",
                "url":"shanghaibanner/product.png"
            },
            {
                "name":"title_png",
                "type":"image",
                "url":"shanghaibanner/title.png"
            }]
    }
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
        "slide-down": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                //marginRight: -el.offsetWidth*0.5,
                marginTop: -el.offsetHeight*0.5
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
    function initFlower(res){
        var $win = $(window);
        var winHeight = window.innerHeight || $win.height(),
            winWidth = window.innerWidth || $win.width(),
            $flowers = $('<div style="position:fixed; top:100px; left:0;"></div>');
        if(!requestAnimationFrame){
            $flowers.css('position', 'absolute');
        }
        var items = [
            {width:69, height:55, top:-7, leftToCenter:157}
            ,{width:112, height:128, top:70, leftToCenter:242}
            ,{width:79, height:69, top:309, leftToCenter:231}
            ,{width:92, height:63, top:99, leftToCenter:-310}
            ,{width:14, height:15, top:84, leftToCenter:45}
            ,{width:20, height:26, top:135, leftToCenter:202}
            ,{width:20, height:26, top:135, leftToCenter:202}
            ,{width:22, height:26, top:82, leftToCenter:-216}
            ,{width:22, height:14, top:164, leftToCenter:-131}
            ,{width:166, height:119, top:345, leftToCenter:-416}
            ,{width:27, height:46, top:438, leftToCenter:-130}
            ,{width:28, height:28, top:296, leftToCenter:-259}
        ]
        for(var i=0; i<items.length; i++){
            var item = items[i];
            item.density = Math.random() * 12;
            if(requestAnimationFrame){
                item.top -= (650 + Math.random()*200);
            }
            var url = res['f'+(i+1)+'_png'].url;
            item.left = winWidth/2+item.leftToCenter;
            item.dom = $(document.createElement('img')).attr({
                width: item.width,
                height: item.height,
                src: /^http:/.test(url) ? url : 'images/'+url //'images/shanghaibanner/f1.png'
            }).css({
                position:'absolute',
                top:item.top,
                left:item.left,
                'pointer-events':'none'
            })
            $flowers.append(item.dom);
        }
        $('body').append($flowers);
        function draw(){
            update();
            items.forEach(function(item){
                item.dom.css({
                    top: item.top,
                    left: item.left
                })
            })
            requestAnimationFrame(draw);
        }
        var angle = 0;
        function update(){
            angle += 0.01;
            items.forEach(function(item){
                item.top += 0.5*Math.cos(angle+item.density) + 2;
                item.left += Math.sin(angle);
                if(item.left > winWidth+item.width || item.left < -item.width){
                    if(Math.sin(angle)>0){
                        item.left = -item.width;
                    } else {
                        item.left = winWidth+5;
                    }
                }
                if(item.top > winHeight-100+item.height){
                    item.top = -item.height;
                }
            })
        }
        //低端浏览器不做动画处理
        if(requestAnimationFrame){
            requestAnimationFrame(draw);
        }
    }
    function loadResource(){
        var loader = new Resource.loadGroup("preload", resData);
        var spin = Resource.el('#evt_spin');

        loader.on("progress", function (loaded, total) {
            spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });

        loader.on("complete", function(){
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            correctPNG(document.getElementById('evt_container'));
            bindScroll('#evt_container');
            initFlower(Resource.getAsset());
        });
    }
    $(function(){
        loadResource();
    })
})()