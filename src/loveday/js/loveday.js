;(function(){
    var resData = {
        "groups":[
            {
                "keys":"loading-bg-left_jpg,loading-bg-right_jpg,title_png",
                "name":"pre"
            },
            {
                "keys":"price_png,product_png,text1_png,text2_png,buybtn-disable_png,buybtn_png,content-bg_jpg,f1_png,f2_png,f3_png,f4_png,f5_png,f6_png,f7_png,f8_png,f9_png,f10_png,f11_png,f12_png,icon_png,img1_png,img2_png",
                "name":"res"
            }],
        "resources":[
            {
                "name":"buybtn-disable_png",
                "type":"image",
                "url":"lv2/buybtn-disable.png"
            },
            {
                "name":"buybtn_png",
                "type":"image",
                "url":"lv2/buybtn.png"
            },
            {
                "name":"content-bg_jpg",
                "type":"image",
                "url":"lv2/content-bg.jpg"
            },
            {
                "name":"f1_png",
                "type":"image",
                "url":"lv2/f1.png"
            },
            {
                "name":"f2_png",
                "type":"image",
                "url":"lv2/f2.png"
            },
            {
                "name":"f3_png",
                "type":"image",
                "url":"lv2/f3.png"
            },
            {
                "name":"f4_png",
                "type":"image",
                "url":"lv2/f4.png"
            },
            {
                "name":"f5_png",
                "type":"image",
                "url":"lv2/f5.png"
            },
            {
                "name":"f6_png",
                "type":"image",
                "url":"lv2/f6.png"
            },
            {
                "name":"f7_png",
                "type":"image",
                "url":"lv2/f7.png"
            },
            {
                "name":"f8_png",
                "type":"image",
                "url":"lv2/f8.png"
            },
            {
                "name":"f9_png",
                "type":"image",
                "url":"lv2/f9.png"
            },
            {
                "name":"f10_png",
                "type":"image",
                "url":"lv2/f10.png"
            },
            {
                "name":"f11_png",
                "type":"image",
                "url":"lv2/f11.png"
            },
            {
                "name":"f12_png",
                "type":"image",
                "url":"lv2/f12.png"
            },
            {
                "name":"icon_png",
                "type":"image",
                "url":"lv2/icon.png"
            },
            {
                "name":"img1_png",
                "type":"image",
                "url":"lv2/img1.png"
            },
            {
                "name":"img2_png",
                "type":"image",
                "url":"lv2/img2.png"
            },
            {
                "name":"loading-bg-left_jpg",
                "type":"image",
                "url":"lv2/loading-bg-left.jpg"
            },
            {
                "name":"loading-bg-right_jpg",
                "type":"image",
                "url":"lv2/loading-bg-right.jpg"
            },
            {
                "name":"price_png",
                "type":"image",
                "url":"lv2/price.png"
            },
            {
                "name":"product_png",
                "type":"image",
                "url":"lv2/product.png"
            },
            {
                "name":"text1_png",
                "type":"image",
                "url":"lv2/text1.png"
            },
            {
                "name":"text2_png",
                "type":"image",
                "url":"lv2/text2.png"
            },
            {
                "name":"title_png",
                "type":"image",
                "url":"lv2/title.png"
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





    var $win = $(window)
        ,$header = $('.header')
        ,$container = $('#evt_container')
        ,$sec1 = $('.sec1')
        ,$sec2 = $('.sec2')
        ,sec1Top=0,sec2Top=840
        ,containerWidth
        ,containerHeight
        ,scale
        ,headerHeight
        ,winWidth
        ,winHeight
        ,viewHeight
    function initDomByScreenHeight(){
        headerHeight = $header.height();
        winWidth = $win.width();
        winHeight = $win.height();
        viewHeight = winHeight - headerHeight;
        containerWidth = winWidth>1920 ? 1920 : (winWidth>1280 ? winWidth : 1280);
        containerHeight = viewHeight>840 ? 840 : (viewHeight>500 ? viewHeight : 500);
        scale = containerHeight / 840;
        $container.css({
            width: containerWidth,
            height: containerHeight
        });
        $sec2.css({
            top:sec2Top
        });

    }
    function initScroll(){
        var btnOffTop = 678; //$('.sec1 .buybtn').offset().top-100+40; 按钮到顶部的距离
        var percent = 0.3;
        var ofTop = containerHeight < btnOffTop ? (btnOffTop-containerHeight)/percent : 0 ;    //露出按钮所需要滚动的距离
        var blankHeight = viewHeight>840 ? (840*2+viewHeight-840) : (840*2);
        blankHeight += (1-percent)*ofTop;
        $('#blankdiv').css({
            height: blankHeight
        })
        $win.on('scroll', function(ev){
            var sTop = $win.scrollTop();
            sec1Top = -sTop*0.3;
            if(sTop<ofTop){
                sec2Top = 840-sTop*0.3;
            } else {
                sec2Top = 840-(ofTop*0.3+sTop-ofTop);
            }
            $sec1.css('top', sec1Top);
            $sec2.css('top', sec2Top)
        })
    }

    function initRule(){
        $('.rtitle').on('click', function(){
            $('.rule').toggle();
        })
    }

    function animateLoading(callback){
        $('#evt_loading .title').fadeOut();
        $('#evt_spin').fadeOut(function(){
            $win.scrollTop(0)
            $('#evt_loading .bg-left').animate({
                right: '100%'
            }, 500)
            $('#evt_loading .bg-right').animate({
                left: '100%'
            }, 500, function(){
                $('#evt_loading').hide();
                callback();
            })
        })
    }

    function loadRes(){
        var loader = new Resource.loadGroup("res", resData);
        var spin = Resource.el('#evt_spin');
        loader.on("progress", function (loaded, total) {
            spin.innerHTML = Math.floor(loaded / total * 100) + "%";
        });
        loader.on("complete", function(){
            $('#blankdiv').show();
            $('#evt_content').show();
            $('.flower').parallax({
                elementWidth : 1000,
                elementHeight : 1000
            });
            initRule();
            initScroll();
            animateLoading(function(){
                bindScroll('#evt_container')
            });
        });
    }

    function loadPre(){
        var loader = new Resource.loadGroup("pre", resData);

        loader.on("complete", function(){
            loadRes();
        });
    }
    initDomByScreenHeight();
    loadPre();
})()