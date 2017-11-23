/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    var resData = {
        "groups":[
            {
                "keys":"papa_title_png,picture_png,rule_flag_png,rule_hint_png,bulaji_png,bulaji_arrow_png,bulaji_text_png,bulaji_text_cn_png,buy_btn_png,buy_btn_disabled_png,cake_png,cake_hint_png,cake2_png,chocolate_png,chocolate_arrow_png,chocolate_text_png,chocolate_text_cn_png,coffee_png,fly_papa_png,mango_png,mango_text_png,mango_text_cn_png,nuts_png,nuts_arrow_png,nuts_text_png,nuts_text_cn_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"papa_title_png",
                "type":"image",
                "url":"papa_title.png"
            },
            {
                "name":"picture_png",
                "type":"image",
                "url":"picture.png"
            },
            {
                "name":"rule_flag_png",
                "type":"image",
                "url":"rule_flag.png"
            },
            {
                "name":"rule_hint_png",
                "type":"image",
                "url":"rule_hint.png"
            },
            {
                "name":"bulaji_png",
                "type":"image",
                "url":"bulaji.png"
            },
            {
                "name":"bulaji_arrow_png",
                "type":"image",
                "url":"bulaji_arrow.png"
            },
            {
                "name":"bulaji_text_png",
                "type":"image",
                "url":"bulaji_text.png"
            },
            {
                "name":"bulaji_text_cn_png",
                "type":"image",
                "url":"bulaji_text_cn.png"
            },
            {
                "name":"buy_btn_png",
                "type":"image",
                "url":"buy_btn.png"
            },
            {
                "name":"buy_btn_disabled_png",
                "type":"image",
                "url":"buy_btn_disabled.png"
            },
            {
                "name":"cake_png",
                "type":"image",
                "url":"cake.png"
            },
            {
                "name":"cake_hint_png",
                "type":"image",
                "url":"cake_hint.png"
            },
            {
                "name":"cake2_png",
                "type":"image",
                "url":"cake2.png"
            },
            {
                "name":"chocolate_png",
                "type":"image",
                "url":"chocolate.png"
            },
            {
                "name":"chocolate_arrow_png",
                "type":"image",
                "url":"chocolate_arrow.png"
            },
            {
                "name":"chocolate_text_png",
                "type":"image",
                "url":"chocolate_text.png"
            },
            {
                "name":"chocolate_text_cn_png",
                "type":"image",
                "url":"chocolate_text_cn.png"
            },
            {
                "name":"coffee_png",
                "type":"image",
                "url":"coffee.png"
            },
            {
                "name":"fly_papa_png",
                "type":"image",
                "url":"fly_papa.png"
            },
            {
                "name":"mango_png",
                "type":"image",
                "url":"mango.png"
            },
            {
                "name":"mango_text_png",
                "type":"image",
                "url":"mango_text.png"
            },
            {
                "name":"mango_text_cn_png",
                "type":"image",
                "url":"mango_text_cn.png"
            },
            {
                "name":"nuts_png",
                "type":"image",
                "url":"nuts.png"
            },
            {
                "name":"nuts_arrow_png",
                "type":"image",
                "url":"nuts_arrow.png"
            },
            {
                "name":"nuts_text_png",
                "type":"image",
                "url":"nuts_text.png"
            },
            {
                "name":"nuts_text_cn_png",
                "type":"image",
                "url":"nuts_text_cn.png"
            }]
    };

    var papaMcData = {"mc":{
        "papa":{
            "frameRate":24,
            "events":[

            ],
            "frames":[

                {
                    "res":"FFEBAE70",
                    "x":6,
                    "y":2,
                    "duration":6
                },
                {
                    "res":"7FC7D51E",
                    "x":6,
                    "y":2,
                    "duration":6
                },
                {
                    "res":"30E80454",
                    "x":6,
                    "y":2,
                    "duration":6
                }
            ]
        }},
        "res":{
            "FFEBAE70":{"x":0,"y":0,"w":547,"h":288},
            "30E80454":{"x":0,"y":290,"w":547,"h":288},
            "7FC7D51E":{"x":0,"y":580,"w":547,"h":288}
        }};

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

        var chainHandle = function(){
            setAnimate($(chain).get(0));
            el.removeEventListener('webkitAnimationEnd', chainHandle, false);
            el.removeEventListener('animationend', chainHandle, false);
        };

        if( isSupportCss3 ){
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
                    chain && setAnimate($(chain).get(0));
                });
            }
        }
    };

    var setAllAnimate = function(container){
        $(container).find("[data-anim]").each(function(){
            setAnimate(this);
        });
    };

    var setPapaMC = function(){
        var mc = new MovieClip(Resource.getRes('papa_title_png'), papaMcData, 'papa', 'super_papa');
        mc.gotoAndPlay(1, -1);
        return mc;
    };

    var bindScroll = function( container ){

        var checkOffset = 0;
        var $win = $(window);
        var winHeight = $win.height();
        var initScrollTop = $win.scrollTop();
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
                        if (scrollTop + docHeight - checkOffset > obj.scrollTop + initScrollTop) {
                            setAnimate(obj.$elem[0], obj.scrollTop < winHeight);
                            obj.isAnimated = true;
                        }
                    }
                });
            })
            .trigger('scroll');
    };

    var loadResource = function(){

        var loadComplete = function () {
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            setPapaMC();
            correctPNG(Resource.el('#evt_container'));
            bindScroll('#evt_container');
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