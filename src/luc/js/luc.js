/**
 * Created by mcake on 2016/5/24.
 */
;(function($){
    var resData = {};

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
            setAnimate(this, true);
        });
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

    var bindBearScroll = function(){
        var bear = $("#bears")
        var bearScrollTop = bear.offset().top;

        $(window).on('scroll.bear', function(){
            var scrollTop = window.pageYOffset || $(this).scrollTop();
            var docHeight = document.documentElement.clientHeight;

            if( scrollTop + docHeight > bearScrollTop ){
                setBearAnimate(bear);
                $(this).off("scroll.bear");
            }
        }).trigger('scroll.bear');
    };

    var genBear = function(){
        var bearMark = [
            1,0,0,1,1,1,0,0,0,0,
            1,0,1,0,0,0,1,0,0,1,
            1,1,0,1,0,0,1,0,1,0,
            0,0,1,0,0,1,0,1,0,0,
            0,1,0,1,0,0,1,1,0,1,
            0,1,0,0,0,0,0,1,1,0,
            0,0,0,0,0,0,0,1,0,0,
            0,0,1,0,1,1,0,0,0,1,
            1,0,0,1,0,0,1,0,1,0,
            0,1,0,1,1,0,0,0,1,0
        ];

        var bears = "";

        $.each(bearMark, function(i, mark){
            bears += '<span class="bear"><b data-bear="'+ mark +'"></b></span>';
        });

        return bears;
    };

    var fillBears = function(container){
        $(container).html(genBear());
    };

    var setBearAnimate = function(container){
        var bears = container.find('[data-bear=0]').get();

        function fadeOut(){
            if( bears.length == 0 ) return;

            var idx = Math.floor(Math.random()*bears.length);
            var $el = $(bears.splice(idx, 1));

            if( isSupportCss3 ){
                $el.addClass("fade-out");
            } else {
                $el.animate({opacity: 0}, 200);
            }

            setTimeout(fadeOut, 100);
        }

        fadeOut();
    };

    var player;
    var isCreated = false;
    var isPlayed = true;
    var isHoverd = false;
    var $playBtn = $("#video-play");
    var $player = $("#video-player");
    var createPlayer = function(){
        player = videojs('topic_player',
            {
                flash: {swf: "http://edm.mcake.com/shuxy/2016/luc/js/video-js.swf"},
                sources: [{src: "http://edm.mcake.com/shuxy/2016/luc/images/video/luc-full.mp4", type: "video/mp4"}]
            },
            function() {
                this.play();
                this.on('ended', function() {
                    $playBtn.removeClass("hidden pause");
                    $player.removeClass("show");
                    isPlayed = false;
                });
            });
    };

    var initPlayer = function(){
        var timer;
        $playBtn.on("click", function(){
            var $this = $(this);
            $this.addClass("hidden");
            if( isCreated ) {
                if( isPlayed ){
                    player.pause();
                    $this.removeClass("pause");
                    isPlayed = false;
                } else {
                    player.play();
                    $this.addClass("pause");
                    isPlayed = true;
                }
            } else {
                createPlayer();
                $this.addClass("pause");
                isCreated = true;

                $player.hover(function(){
                    if( !isHoverd ) return;
                    if( timer ) clearTimeout(timer);
                    $playBtn.removeClass("hidden");
                }, function(){
                    if( !$playBtn.hasClass('pause') ) return;
                    isHoverd = true;
                    timer = setTimeout(function(){
                        $playBtn.addClass("hidden");
                    }, 200);
                });
            }

            $player.addClass("show");
        });

        $playBtn.mouseenter(function(){
            if( timer ) clearTimeout(timer);
        });
    };

    var loadResource = function(){

        var loadComplete = function () {
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            correctPNG(Resource.el('#evt_container'));
            setAllAnimate('#evt_container');
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
        //loadResource();
        //correctPNG(Resource.el('#evt_container'));
        setAllAnimate('#evt_container');
        fillBears("#bears");
        bindBearScroll();
        //initPlayer();

        $("#video-play").after('<div class="evt-date"><a href="http://www.mcake.com/shop/article-66.html" target="_blank"></a></div>');
    });

})(jQuery);