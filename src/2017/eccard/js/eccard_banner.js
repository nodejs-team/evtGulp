/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    var resData = {
        "groups":[
            {
                "keys":"sq_png,q_png,q1_png,q2_png,q3_png,q4_png,q5_png,q6_png,float_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"sq_png",
                "type":"image",
                "url":"banner/sq.png"
            },
            {
                "name":"q_png",
                "type":"image",
                "url":"banner/q.png"
            },
            {
                "name":"q1_png",
                "type":"image",
                "url":"banner/q1.png"
            },
            {
                "name":"q2_png",
                "type":"image",
                "url":"banner/q2.png"
            },
            {
                "name":"q3_png",
                "type":"image",
                "url":"banner/q3.png"
            },
            {
                "name":"q4_png",
                "type":"image",
                "url":"banner/q4.png"
            },
            {
                "name":"q5_png",
                "type":"image",
                "url":"banner/q5.png"
            },
            {
                "name":"q6_png",
                "type":"image",
                "url":"banner/q6.png"
            },
            {
                "name":"float_png",
                "type":"image",
                "url":"banner/float.png"
            }]
    };

    var sqMcData = {"mc":{
        "sq":{
            "frameRate":24,
            "events":[

            ],
            "frames":[

                {
                    "res":"EFBB3944",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"20087D5",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"F3A5629C",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"EFBB3944",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"20087D5",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"F3A5629C",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"EFBB3944",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"20087D5",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"F3A5629C",
                    "x":0,
                    "y":1,
                    "duration":4
                },
                {
                    "res":"7A46E04A",
                    "x":0,
                    "y":1,
                    "duration":1
                }
            ]
        }},
        "res":{
            "EFBB3944":{"x":0,"y":0,"w":113,"h":102},
            "7A46E04A":{"x":115,"y":0,"w":113,"h":102},
            "F3A5629C":{"x":0,"y":104,"w":113,"h":102},
            "20087D5":{"x":115,"y":104,"w":113,"h":102}
        }};

    var qMcData = {"mc":{
        "q":{
            "frameRate":24,
            "events":[

            ],
            "frames":[

                {
                    "res":"6DBEFCB3",
                    "x":24,
                    "y":27,
                    "duration":2
                },
                {
                    "res":"20085693",
                    "x":24,
                    "y":27,
                    "duration":2
                },
                {
                    "res":"5DE45F63",
                    "x":24,
                    "y":27,
                    "duration":2
                },
                {
                    "res":"944EDC10",
                    "x":24,
                    "y":27,
                    "duration":2
                }
            ]
        }},
        "res":{
            "20085693":{"x":0,"y":0,"w":152,"h":171},
            "944EDC10":{"x":154,"y":0,"w":148,"h":171},
            "6DBEFCB3":{"x":0,"y":173,"w":152,"h":171},
            "5DE45F63":{"x":304,"y":0,"w":148,"h":171}
        }};

    var floatMcData = {"mc":{
        "float":{
            "frameRate":24,
            "events":[

            ],
            "frames":[

                {
                    "res":"19B6B2E7",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"25550579",
                    "x":0,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"F01A20BD",
                    "x":0,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"A0C3EBDE",
                    "x":0,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"21E0E272",
                    "x":4,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"D352EA80",
                    "x":13,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"6986894F",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"4AB74D81",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"AF466929",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"4CB6870F",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"A4E55CB",
                    "x":12,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"7C101685",
                    "x":8,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"C75260A0",
                    "x":4,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"96A0FF64",
                    "x":0,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"249C4E4B",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"9D884DD6",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"5B759411",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"FFBCAEC6",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"398DCE4E",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"27FEAD56",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"B39CDC04",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"16457BF0",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"C5435307",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"CE4600D3",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"5C59F80A",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"E4B00FDE",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"30B99635",
                    "x":15,
                    "y":7,
                    "duration":1
                },
                {
                    "res":"E9E757C",
                    "x":15,
                    "y":7,
                    "duration":1
                }
            ]
        }},
        "res":{
            "25550579":{"x":294,"y":0,"w":125,"h":111},
            "7C101685":{"x":548,"y":0,"w":117,"h":111},
            "F01A20BD":{"x":420,"y":113,"w":125,"h":111},
            "AF466929":{"x":669,"y":339,"w":110,"h":111},
            "6986894F":{"x":776,"y":226,"w":110,"h":111},
            "27FEAD56":{"x":283,"y":339,"w":132,"h":111},
            "CE4600D3":{"x":417,"y":339,"w":124,"h":111},
            "A4E55CB":{"x":547,"y":226,"w":113,"h":111},
            "30B99635":{"x":0,"y":0,"w":145,"h":111},
            "4AB74D81":{"x":888,"y":226,"w":110,"h":111},
            "5C59F80A":{"x":147,"y":339,"w":134,"h":111},
            "B39CDC04":{"x":288,"y":226,"w":129,"h":111},
            "4CB6870F":{"x":782,"y":113,"w":110,"h":111},
            "9D884DD6":{"x":0,"y":113,"w":145,"h":111},
            "FFBCAEC6":{"x":0,"y":226,"w":145,"h":111},
            "21E0E272":{"x":669,"y":0,"w":121,"h":111},
            "A0C3EBDE":{"x":293,"y":113,"w":125,"h":111},
            "16457BF0":{"x":419,"y":226,"w":126,"h":111},
            "5B759411":{"x":0,"y":339,"w":145,"h":111},
            "E9E757C":{"x":147,"y":0,"w":145,"h":111},
            "E4B00FDE":{"x":147,"y":113,"w":144,"h":111},
            "C5435307":{"x":543,"y":339,"w":124,"h":111},
            "249C4E4B":{"x":670,"y":113,"w":110,"h":111},
            "398DCE4E":{"x":147,"y":226,"w":139,"h":111},
            "C75260A0":{"x":547,"y":113,"w":121,"h":111},
            "96A0FF64":{"x":421,"y":0,"w":125,"h":111},
            "19B6B2E7":{"x":888,"y":0,"w":110,"h":111},
            "D352EA80":{"x":662,"y":226,"w":112,"h":111}
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

    var setSqMC = function(){
        var mc = new MovieClip(Resource.getRes('sq_png'), sqMcData, 'sq', 'sq_dance');
        mc.gotoAndPlay(1, -1);
        return mc;
    };

    var setQMC = function(){
        var mc = new MovieClip(Resource.getRes('q_png'), qMcData, 'q', 'q_dance');
        mc.gotoAndPlay(1, -1);
        return mc;
    };

    var setFloatMC = function(){
        var mc = new MovieClip(Resource.getRes('float_png'), floatMcData, 'float', 'float');
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
            correctPNG($('#evt_container').get(0));
            setFloatMC();
            setSqMC();
            setQMC();
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