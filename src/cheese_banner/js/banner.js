/**
 * Created by mcake on 2016/4/14.
 */
window.onload = function(){
    Resource.baseUrl = "http://edm.mcake.com/shuxy/2016/cheese/images/";
    var resData = {
        "groups":[
            {
                "keys":"mouse_png,title1_png,h1_png,h2_png,h3_png,h4_png,h5_png,h6_png,h7_png,bear_png,bear_text_png,bear_text_hover_png,bg_jpg,cake_png,cake_deco1_png,cake_text_png,cake_text_hover_png,man_png,man_text_png,man_text_hover_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"mouse_png",
                "type":"image",
                "url":"mouse.png"
            },
            {
                "name":"title1_png",
                "type":"image",
                "url":"title1.png"
            },
            {
                "name":"h1_png",
                "type":"image",
                "url":"sprites/hand/h1.png"
            },
            {
                "name":"h2_png",
                "type":"image",
                "url":"sprites/hand/h2.png"
            },
            {
                "name":"h3_png",
                "type":"image",
                "url":"sprites/hand/h3.png"
            },
            {
                "name":"h4_png",
                "type":"image",
                "url":"sprites/hand/h4.png"
            },
            {
                "name":"h5_png",
                "type":"image",
                "url":"sprites/hand/h5.png"
            },
            {
                "name":"h6_png",
                "type":"image",
                "url":"sprites/hand/h6.png"
            },
            {
                "name":"h7_png",
                "type":"image",
                "url":"sprites/hand/h7.png"
            },
            {
                "name":"bear_png",
                "type":"image",
                "url":"bear.png"
            },
            {
                "name":"bear_text_png",
                "type":"image",
                "url":"bear_text.png"
            },
            {
                "name":"bear_text_hover_png",
                "type":"image",
                "url":"bear_text_hover.png"
            },
            {
                "name":"bg_jpg",
                "type":"image",
                "url":"bg.jpg"
            },
            {
                "name":"cake_png",
                "type":"image",
                "url":"cake.png"
            },
            {
                "name":"cake_deco1_png",
                "type":"image",
                "url":"cake_deco1.png"
            },
            {
                "name":"cake_text_png",
                "type":"image",
                "url":"cake_text.png"
            },
            {
                "name":"cake_text_hover_png",
                "type":"image",
                "url":"cake_text_hover.png"
            },
            {
                "name":"man_png",
                "type":"image",
                "url":"man.png"
            },
            {
                "name":"man_text_png",
                "type":"image",
                "url":"man_text.png"
            },
            {
                "name":"man_text_hover_png",
                "type":"image",
                "url":"man_text_hover.png"
            }]
    };

    var mc_hand = {"mc":{
        "mc_hand":{
            "frameRate":0,
            "frames":[
                {
                    "x":0,
                    "y":0,
                    "duration":50
                },
                {
                    "x":0,
                    "y":0,
                    "duration":50
                },
                {
                    "x":0,
                    "y":0,
                    "duration":50
                },
                {
                    "x":0,
                    "y":0,
                    "duration":50
                },
                {
                    "x":0,
                    "y":0,
                    "duration":50
                },
                {
                    "x":0,
                    "y":0,
                    "duration":50
                },
                {
                    "x":0,
                    "y":0,
                    "duration":50
                },
                {
                    "x":0,
                    "y":0,
                    "duration":50
                }
            ]
        }}};

    var isSupportCss3 = (function(){
        var ret = /MSIE (\d+\.\d+)/.exec(navigator.userAgent);
        if( !ret || ret[1] > 9 ){
            return true;
        }
        return false;
    })();

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
                    cb && cb();
                    setHandMC();
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
                });
            }, delay);

        },
        "slide-up-r": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginRight: el.offsetWidth*0.5,
                marginTop: el.offsetHeight*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0,
                    marginTop: 0
                }, 1000, function(){
                    cb && cb();
                    if( el.id && el.id == 'evt_man' ){
                        setMouseMc();
                    }
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
        var delay = Number(el.getAttribute('data-delay')||0)*1000;

        if( isSupportCss3 ){
            $(el).addClass(anim).css({
                '-webkit-animation-delay': delay + 'ms',
                'animation-delay' : delay + 'ms'
            });
        } else {
            if( aniMap[anim] ) {
                aniMap[anim].call(el, el, delay);
            }
        }
    };

    var setAllAnimate = function(container){
        $(container).find("[data-anim]").each(function(){
            setAnimate(this);
        });
    };

    var setHandMC = function(){
        var mc_hander = new MovieClip(Resource.getRes('h[1-7]_png'), mc_hand, "mc_hand", "evt_hand");
        mc_hander.gotoAndPlay(1,1);
        return mc_hander;
    };

    var setMouseMc = function(){
        var isEven = false;
        var el = document.getElementById('evt_mouse');
        var timer = new Timer(50, 15);
        timer.addEvent('timer', function(){
            el.style.marginLeft = isEven ? "5px" : "0px";
            isEven = !isEven;
        });
        timer.start();
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
                            + "(src=\'" + img.src + "\', sizingMethod='scale');\">"
                            + "</span>";
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
        var lastDelay = 0;

        elems.each(function(){
            elemObj.push({
                $elem: $(this),
                delay: Number(this.getAttribute('data-delay')),
                anim: this.getAttribute('data-anim'),
                scrollTop: $(this).offset().top,
                isAnimated: false
            });
        });

        var triggerAnimate = function( lastDelay ){
            var scrollTop = $win.scrollTop();
            var docHeight = document.documentElement.clientHeight;

            $.each(elemObj, function(i, obj){
                if( !obj.isAnimated ) {
                    if (scrollTop + docHeight > obj.scrollTop + initScrollTop) {
                        setAnimate(obj.$elem,  lastDelay);
                        obj.isAnimated = true;
                        //lastDelay = obj.delay;
                    }
                }
            });
        };

        $win.on('scroll', function(){
            lastDelay = 5;
            triggerAnimate(lastDelay);
        });

        triggerAnimate();
    };

    setTimeout(function(){
        window.scrollTo(0,0);
    }, 0);

    var loadComplete = function () {
        Resource.el('#evt_loading').style.display = "none";
        Resource.el('#wb_container').style.display = 'block';

        var container = document.getElementById('wb_container');
        var evtTitle = document.getElementById('evt_title');
        var evtMan = document.getElementById('evt_man');

        setPNGfix(container);
        //bindScroll(container);
        setAllAnimate(container);

        $(evtTitle).one("webkitAnimationEnd animationend", function(){
            setTimeout(function(){
                setHandMC();
            }, 200);
        });

        $(evtMan).one("webkitAnimationEnd animationend", function(){
           setMouseMc();
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