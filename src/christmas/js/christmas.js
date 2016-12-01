/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    var resData = {
        "groups":[
            {
                "keys":"m_p5_png,m_p6_png,m_p7_png,m_p8_png,m_p9_png,m_p10_png,m_p11_png,m_p12_png,m_p13_png,m_p14_png,m_p15_png,m_p16_png,main_bg_jpg,banner_bg_jpg,christmas_png,footer_bg_png,lg_price_png,lg_title_png,m_p1_png,m_p2_png,m_p3_png,m_p4_png,lighter_png,christ_logo_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"m_p5_png",
                "type":"image",
                "url":"m_p5.png"
            },
            {
                "name":"m_p6_png",
                "type":"image",
                "url":"m_p6.png"
            },
            {
                "name":"m_p7_png",
                "type":"image",
                "url":"m_p7.png"
            },
            {
                "name":"m_p8_png",
                "type":"image",
                "url":"m_p8.png"
            },
            {
                "name":"m_p9_png",
                "type":"image",
                "url":"m_p9.png"
            },
            {
                "name":"m_p10_png",
                "type":"image",
                "url":"m_p10.png"
            },
            {
                "name":"m_p11_png",
                "type":"image",
                "url":"m_p11.png"
            },
            {
                "name":"m_p12_png",
                "type":"image",
                "url":"m_p12.png"
            },
            {
                "name":"m_p13_png",
                "type":"image",
                "url":"m_p13.png"
            },
            {
                "name":"m_p14_png",
                "type":"image",
                "url":"m_p14.png"
            },
            {
                "name":"m_p15_png",
                "type":"image",
                "url":"m_p15.png"
            },
            {
                "name":"m_p16_png",
                "type":"image",
                "url":"m_p16.png"
            },
            {
                "name":"main_bg_jpg",
                "type":"image",
                "url":"main_bg.jpg"
            },
            {
                "name":"banner_bg_jpg",
                "type":"image",
                "url":"banner_bg.jpg"
            },
            {
                "name":"christmas_png",
                "type":"image",
                "url":"christmas.png"
            },
            {
                "name":"footer_bg_png",
                "type":"image",
                "url":"footer_bg.png"
            },
            {
                "name":"lg_price_png",
                "type":"image",
                "url":"lg_price.png"
            },
            {
                "name":"lg_title_png",
                "type":"image",
                "url":"lg_title.png"
            },
            {
                "name":"m_p1_png",
                "type":"image",
                "url":"m_p1.png"
            },
            {
                "name":"m_p2_png",
                "type":"image",
                "url":"m_p2.png"
            },
            {
                "name":"m_p3_png",
                "type":"image",
                "url":"m_p3.png"
            },
            {
                "name":"m_p4_png",
                "type":"image",
                "url":"m_p4.png"
            },
            {
                "name":"lighter_png",
                "type":"image",
                "url":"lighter.png"
            },
            {
                "name":"christ_logo_png",
                "type":"image",
                "url":"christ_logo.png"
            }]
    };

    var christmasMcData = {
        "c2":{"x":0,"y":233,"w":215,"h":224,"offX":9,"offY":0,"sourceW":226,"sourceH":234,duration:18},
        "c1":{"x":0,"y":0,"w":211,"h":231,"offX":9,"offY":0,"sourceW":226,"sourceH":234,duration:30}
    };

    var lighterMcData = {
        "l1":{"x":0,"y":214,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
        "l2":{"x":196,"y":214,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
        "l3":{"x":196,"y":107,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
        "l4":{"x":0,"y":107,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
        "l5":{"x":196,"y":0,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
        "l6":{"x":0,"y":0,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2}};

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

    var setCheeseMC = function(){
        var mcElwp = document.createElement("div");
        var mcEl = document.createElement("div");
        var mcLogo = document.createElement('div');
        mcLogo.className = "mc-logo";
        $(mcElwp).css({
            position: "fixed",
            left: "50%",
            marginLeft: "255px",
            width: "230px",
            height: "220px",
            top: "47px",
            zIndex: 1000
        }).append(mcEl).append(mcLogo);
        $(document.body).append(mcElwp);
        var mc = new MovieClip('christmas_png', christmasMcData, 'christmas_mc', mcEl);
        mc.gotoAndPlay(1, -1);
        return mc;
    };

    var setLighterMc = function () {
        var mc = new MovieClip('lighter_png', lighterMcData, 'lighter_mc', "lighter");
        mc.gotoAndPlay(1, -1);
        return mc;
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
                        if (scrollTop + docHeight - checkOffset > obj.scrollTop) {
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

    function getRandom(min, max) {
        return min + Math.random()*(max-min);
    }

    function getWindowSize() {
        return {
            clientW: window.innerWidth || document.documentElement.clientWidth,
            clientH: window.innerHeight || document.documentElement.clientHeight
        }
    }

    var clientSize = getWindowSize();
    var body = document.body;

    function Snow(container, opts) {
        this.container = container;
        this.opts = opts;
        this.create();
    }

    Snow.prototype = {
        create: function () {
            this.el = document.createElement("div");
            this.el.className = 'snow';
            this.el.style["width"] = this.opts.snowWidth + "px";
            this.el.style["height"] = this.opts.snowHeight + "px";
            this.el.style["top"] = -this.opts.snowHeight + "px";
            this.el.style["-webkit-transition"] = "all " + this.opts.speed + "ms linear";
            this.el.style["transition"] = "all " + this.opts.speed + "ms linear";

            this.container.appendChild(this.el);
            this.fall();
        },
        fall: function () {
            var self = this;
            var left = getRandom(0, clientSize.clientW - this.opts.snowWidth);
            var destLeft = getRandom(-300, 300);
            var scale = getRandom(0.6, 1);

            this.el.style["left"] = left + "px";
            this.el.style["-ms-transform"] = "scale("+ scale +")";
            this.el.style["-webkit-transform"] = "scale("+ scale +")";
            this.el.style["transform"] = "scale("+ scale +")";

            body.offsetWidth;
            var transformStyle = "scale("+ scale +") translate3d("+ destLeft +"px,"+ (clientSize.clientH + this.opts.snowHeight)*2 +"px,0px)";
            this.el.style["-webkit-transform"] = transformStyle;
            this.el.style["transform"] = transformStyle;

            //当前页面失去焦点时，通过transitionend的方式移除this.el会有问题，因此通过这种方式移除
            $({y: -this.opts.snowHeight, left: left}).animate({
                y: (clientSize.clientH + this.opts.snowHeight)*(1/scale),
                left: left + destLeft
            }, {
                easing: 'linear',
                duration: this.opts.speed,
                step: function ( value, obj) {
                    if( !isSupportCss3 ){
                        if( obj.prop == 'y' ) {
                            self.el.style.top = obj.now + "px";
                        }
                        if( obj.prop == 'left' ){
                            self.el.style.left = obj.now + "px";
                        }
                    }
                },
                complete: function () {
                    self.reset();
                }
            });
        },
        reset: function () {
            try {
                this.container.removeChild(this.el);
            } catch (e){
                console.error(e.message);
            }
        }
    };

    function SnowFall(opts){
        this.opts = $.extend({
            interval: 100,
            speed: 5000,
            snowWidth: 15,
            snowHeight: 15
        }, opts||{});

        this.timer = null;
        this.body = document.body;

        this.init();
    }

    SnowFall.prototype = {
        init: function () {
            this.createLayout();
            this.start();
        },
        start: function () {
            new Snow(this.container, this.opts);
            this.timer = setTimeout(function () {
                this.start();
            }.bind(this), this.opts.interval);
        },
        createLayout:function () {
            this.container = document.createElement("div");
            this.container.className = 'snow-container';
            this.body.appendChild(this.container);
        },
        destroy: function () {
            if( this.timer ) clearTimeout(this.timer);
            this.container.parentNode.removeChild(this.container);
        }
    };

    $(function () {
        $(window).on("resize", function () {
            clientSize = getWindowSize();
        });
    });

    var loadResource = function(){

        var loadComplete = function () {
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            setCheeseMC();
            setLighterMc();
            correctPNG($('#evt_container').get(0));
            bindScroll('#evt_container');
            new SnowFall();
        };
        var loader = new Resource.loadGroup("preload", resData);
        var spin = Resource.el('#evt_spin');

        loader.addEvent("progress", function (loaded, total) {
            spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });

        loader.addEvent("complete", loadComplete);
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

})(jQuery);