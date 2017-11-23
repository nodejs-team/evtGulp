/**
 * Created by mcake on 2016/5/24.
 */
;(function($){
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
                sources: [{src: "http://edm.mcake.com/shuxy/2016/luc/images/video/luc-brief.mp4", type: "video/mp4"}]
            },
            function() {
                this.play();
                this.on('ended', function() {
                    $playBtn.removeClass("pause");
                    $playBtn.addClass("hidden");
                    $player.removeClass("show");
                    isPlayed = false;
                });
            });
    };

    var initPlayer = function(){
        var timer;
        $playBtn.add("#video-start").on("click", function(){
            var $this = $playBtn;
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

    $(function(){
        //setAllAnimate('#evt_container');
        initPlayer();
    });

})(jQuery);