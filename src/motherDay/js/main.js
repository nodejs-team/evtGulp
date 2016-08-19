/**
 * Created by mcake on 2016/4/14.
 */
window.onload = function(){
    //Resource.baseUrl = "/shop/theme/xth1/images/activity/2016/mothersDay/";
    Resource.baseUrl = "images/";
    var resLoader = new Resource.JSONloader('default.res.json');
    var mc_title;
    var mc_player
    var mc_recorder;
    var recorder;
    var isPlay = false;
    var isPlayed = false;

    var isSupportCss3 = (function(){
        var ret = /MSIE (\d+\.\d+)/.exec(navigator.userAgent);
        if( !ret || ret[1] > 9 ){
            return true;
        }
        return false;
    })();

    var recorderFun = function(){
        var $audio = $("#m_audio");
        $audio.jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    title: "",
                    mp3: "http://edm.mcake.com/shuxy/2016/motherDay/images/audio.mp3"
                });
            },
            ended: function(){
                mc_recorder.stop();
                isPlay = false;
            },
            swfPath: "http://edm.mcake.com/shuxy/2016/motherDay/js/jplayer",
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        });

        return {
            play: function(){
                $audio.jPlayer('play');
            },
            pause: function(){
                $audio.jPlayer('pause');
            }
        };
    };

    var setMCtitle = function(){
        var title = document.getElementById('m_title');
        mc_title = new MovieClip(Resource.getRes('t[1-2]_png'), Resource.getRes('title_json'), "mc_title", title);
        mc_title.setFrame(0);

        var endHandle = function () {
            mc_title.gotoAndPlay(1,-1);
        };

        if( isSupportCss3 ){
            title.addEventListener('webkitAnimationEnd', endHandle);
            title.addEventListener('animationend', endHandle);
        }

    };

    var aniMap = {
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
                }, 1000, function(){
                    mc_title.gotoAndPlay(1,-1);
                    cb && cb();
                });
            }, delay);

        },
        "slide-down-l2": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.4,
                marginTop: -el.offsetHeight*0.4
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, function(){
                    mc_player.gotoAndPlay(1,-1);
                    cb && cb();
                });
            }, delay);

        },
        "slide-down-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginRight: -el.offsetWidth*0.15,
                marginTop: -el.offsetHeight*0.8
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginRight: 0,
                    marginTop: 0
                }, 1000, cb);
            }, delay);

        },
        "slide-down-r2": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginRight: -el.offsetWidth*0.15,
                marginTop: -el.offsetHeight*0.8
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginRight: 0,
                    marginTop: 0
                }, 1000, cb);
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
                }, 1000, cb);
            }, delay);

        },
        "slide-up-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginRight: -el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginRight: 0,
                    marginTop: 0
                }, 1000, cb);
            }, delay);

        },
        "rotate-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginRight: -el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginRight: 0,
                    marginTop: 0
                }, 1000, cb);
            }, delay);

        },
        "fade-down": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.02,
                marginTop: -el.offsetHeight*0.1
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, cb);
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

    var setAnimate = function(el){
        var anim = el.getAttribute('data-anim');
        if( !aniMap[anim] ) return;
        var delay = Number(el.getAttribute('data-delay')||0)*1000;
        aniMap[anim].call(el, el, delay);
    };

    var setPNGfix = function(container){
        function correctPNG() {
            var arVersion = navigator.appVersion.split("MSIE");
            var version = parseFloat(arVersion[1]);
            if ((version >= 5.5) && (document.body.filters)) {
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
        }

        if (typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined") {
            window.attachEvent("onload", correctPNG);
        }
    };

    var bindScroll = function( container ){

        var $win = $(window);
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
                    if (scrollTop + docHeight > obj.scrollTop + initScrollTop) {
                        if( isSupportCss3 ){
                            obj.$elem.addClass(obj.anim);
                        } else {
                            setAnimate(obj.$elem[0]);
                        }
                        obj.isAnimated = true;
                    }
                }
            });
        })
        .trigger('scroll');
    };

    var loadComplete = function () {
        document.body.removeChild(Resource.el('#loading_wrap'));
        Resource.el('#mother_wrap').style.display = 'block';

        setPNGfix(document.getElementById('mother_wrap'));

        recorder = recorderFun();

        var $letter = $("#m_letter");
        var $lparent = $letter.parent();

        mc_player = new MovieClip(Resource.getRes('p[1-5]_png'), Resource.getRes('player_json'), "mc_play", "player");
        mc_recorder = new MovieClip(Resource.getRes('r[1-2]_png'), Resource.getRes('recorder_json'), "mc_recorder", "recorder");

        setMCtitle();

        bindScroll("#mother_wrap");

        if( isSupportCss3 ){
            mc_player.setFrame(0);
        }

        $lparent.on("webkitAnimationEnd animationend", function(){
            mc_player.gotoAndPlay(1, -1);
        });

        $letter.on("click", function(){

            if( !isPlayed ) {
                mc_player.el.style.display = 'none';
                mc_player.stop().clear();

                mc_recorder.el.style.display = 'block';
                mc_recorder.gotoAndPlay(1, -1);

                isPlayed = true;
            }

            if( isPlay ){
                recorder.pause();
                mc_recorder.stop();
                this.title = '点击播放录音';
            } else {
                recorder.play();
                mc_recorder.play();
                this.title = '点击暂停录音';
            }

            isPlay = !isPlay;
        });
    };

    resLoader.addEvent('success', function (data) {

        //var preLoader = new Resource.loadGroup("loading", data);
        //preLoader.addEvent('complete', function(){
        var loader = new Resource.loadGroup("preload", data);
        var spin = Resource.el('#loading_indicator');

        loader.addEvent("progress", function (loaded, total) {
            spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });

        loader.addEvent("complete", loadComplete);
        //});

    });
};