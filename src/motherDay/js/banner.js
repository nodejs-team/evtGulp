/**
 * Created by mcake on 2016/4/14.
 */
window.onload = function(){
    Resource.baseUrl = "http://edm.mcake.com/shuxy/2016/motherDay/images/";
    var resData = {
        "groups":[
            {
                "keys":"buy_btn_disabled_png,buy_info_png,cake_png,quqi_png,tips_png,title_png,w1_png,w10_png,w11_png,w12_png,w13_png,w14_png,w15_png,w16_png,w17_png,w18_png,w19_png,w2_png,w20_png,w21_png,w22_png,w3_png,w4_png,w5_png,w6_png,w7_png,w8_png,w9_png,bg_jpg,buy_btn_png,r1_png,r2_png,p1_png,p2_png,p3_png,p4_png,p5_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"buy_btn_disabled_png",
                "type":"image",
                "url":"banner/buy_btn_disabled.png"
            },
            {
                "name":"buy_info_png",
                "type":"image",
                "url":"banner/buy_info.png"
            },
            {
                "name":"cake_png",
                "type":"image",
                "url":"banner/cake.png"
            },
            {
                "name":"quqi_png",
                "type":"image",
                "url":"banner/quqi.png"
            },
            {
                "name":"tips_png",
                "type":"image",
                "url":"banner/tips.png"
            },
            {
                "name":"title_png",
                "type":"image",
                "url":"banner/title.png"
            },
            {
                "name":"w1_png",
                "type":"image",
                "url":"banner/sprites/walk/w1.png"
            },
            {
                "name":"w10_png",
                "type":"image",
                "url":"banner/sprites/walk/w10.png"
            },
            {
                "name":"w11_png",
                "type":"image",
                "url":"banner/sprites/walk/w11.png"
            },
            {
                "name":"w12_png",
                "type":"image",
                "url":"banner/sprites/walk/w12.png"
            },
            {
                "name":"w13_png",
                "type":"image",
                "url":"banner/sprites/walk/w13.png"
            },
            {
                "name":"w14_png",
                "type":"image",
                "url":"banner/sprites/walk/w14.png"
            },
            {
                "name":"w15_png",
                "type":"image",
                "url":"banner/sprites/walk/w15.png"
            },
            {
                "name":"w16_png",
                "type":"image",
                "url":"banner/sprites/walk/w16.png"
            },
            {
                "name":"w17_png",
                "type":"image",
                "url":"banner/sprites/walk/w17.png"
            },
            {
                "name":"w18_png",
                "type":"image",
                "url":"banner/sprites/walk/w18.png"
            },
            {
                "name":"w19_png",
                "type":"image",
                "url":"banner/sprites/walk/w19.png"
            },
            {
                "name":"w2_png",
                "type":"image",
                "url":"banner/sprites/walk/w2.png"
            },
            {
                "name":"w20_png",
                "type":"image",
                "url":"banner/sprites/walk/w20.png"
            },
            {
                "name":"w21_png",
                "type":"image",
                "url":"banner/sprites/walk/w21.png"
            },
            {
                "name":"w22_png",
                "type":"image",
                "url":"banner/sprites/walk/w22.png"
            },
            {
                "name":"w3_png",
                "type":"image",
                "url":"banner/sprites/walk/w3.png"
            },
            {
                "name":"w4_png",
                "type":"image",
                "url":"banner/sprites/walk/w4.png"
            },
            {
                "name":"w5_png",
                "type":"image",
                "url":"banner/sprites/walk/w5.png"
            },
            {
                "name":"w6_png",
                "type":"image",
                "url":"banner/sprites/walk/w6.png"
            },
            {
                "name":"w7_png",
                "type":"image",
                "url":"banner/sprites/walk/w7.png"
            },
            {
                "name":"w8_png",
                "type":"image",
                "url":"banner/sprites/walk/w8.png"
            },
            {
                "name":"w9_png",
                "type":"image",
                "url":"banner/sprites/walk/w9.png"
            },
            {
                "name":"bg_jpg",
                "type":"image",
                "url":"banner/bg.jpg"
            },
            {
                "name":"buy_btn_png",
                "type":"image",
                "url":"banner/buy_btn.png"
            },
            {
                "name":"r1_png",
                "type":"image",
                "url":"sprites/recorder/r1.png"
            },
            {
                "name":"r2_png",
                "type":"image",
                "url":"sprites/recorder/r2.png"
            },
            {
                "name":"p1_png",
                "type":"image",
                "url":"sprites/player/p1.png"
            },
            {
                "name":"p2_png",
                "type":"image",
                "url":"sprites/player/p2.png"
            },
            {
                "name":"p3_png",
                "type":"image",
                "url":"sprites/player/p3.png"
            },
            {
                "name":"p4_png",
                "type":"image",
                "url":"sprites/player/p4.png"
            },
            {
                "name":"p5_png",
                "type":"image",
                "url":"sprites/player/p5.png"
            }]
    };

    var mc_player = {"mc":{
        "mc_play":{
            "frameRate":200,
            "frames":[
                {
                    "x":0,
                    "y":0,
                    "duration":500
                },
                {
                    "x":0,
                    "y":0,
                    "duration":60
                },
                {
                    "x":0,
                    "y":0,
                    "duration":60
                },
                {
                    "x":0,
                    "y":0,
                    "duration":60
                },
                {
                    "x":0,
                    "y":0,
                    "duration":60
                }
            ]
        }}};

    var mc_recorder = {"mc":{
        "mc_recorder":{
            "frameRate":200,
            "frames":[
                {
                    "x":0,
                    "y":0,
                    "duration":200
                },
                {
                    "x":0,
                    "y":0,
                    "duration":200
                }
            ]
        }}};

    var mc_walker = {"mc":{
        "mc_walker":{
            "frameRate":100,
            "frames":[
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":100
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                },
                {
                    "x":0,
                    "y":0,
                    "duration":0
                }
            ]
        }}};

    //var mc_title;
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
                    //mc_title.gotoAndPlay(1,-1);
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
                }, 1000, function(){
                    mc_player.gotoAndPlay(1, -1);
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
                }, 1000, function(){
                    cb && cb();
                    var mcWalk = seteWalkMC();
                    mcWalk.addEvent('complete', function(){
                        $(mcWalk.el).next().animate({
                            opacity: 1
                        },400);
                    });
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

    var setAllAnimate = function(container){
        container.find("[data-anim]").each(function(){
            setAnimate(this);
        });
    };

    var seteWalkMC = function(){
        var mc_walk = new MovieClip(Resource.getRes('w[1-22]_png'), mc_walker, "mc_walker", "walk_mother");
        mc_walk.gotoAndPlay(1,1);
        return mc_walk;
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

    var loadComplete = function () {
        Resource.el('#evt_loading').style.display = "none";
        Resource.el('#wb_container').style.display = 'block';

        var container = document.getElementById('wb_container');
        var mcWalk;

        recorder = recorderFun();

        setPNGfix(container);

        if( !isSupportCss3 ) {
            setAllAnimate($(container));
        }

        var $letter = $("#m_letter");
        var $lparent = $letter.parent();

        mc_player = new MovieClip(Resource.getRes('p[1-5]_png'), mc_player, "mc_play", "player");
        mc_recorder = new MovieClip(Resource.getRes('r[1-2]_png'), mc_recorder, "mc_recorder", "recorder");

        if( isSupportCss3 ){
            mc_player.setFrame(0);
        }

        $lparent.on("webkitAnimationEnd animationend", function(){
            mc_player.gotoAndPlay(1, -1);
        });

        if( isSupportCss3 ) {
            $(container).find(".evt-quqi-img").on("webkitAnimationEnd animationend", function(){
                mcWalk = seteWalkMC();
                mcWalk.addEvent('complete', function(){
                    $(mcWalk.el).next().addClass('zoom-r')
                });
            });
        }

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


    //var preLoader = new Resource.loadGroup("loading", resData);
    //preLoader.addEvent('complete', function(){
    var loader = new Resource.loadGroup("preload", resData);
    var spin = Resource.el('#evt_spin');

    loader.addEvent("progress", function (loaded, total) {
        spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
    });

    loader.addEvent("complete", loadComplete);
    //});

};