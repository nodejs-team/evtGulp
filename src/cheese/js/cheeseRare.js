/**
 * Created by mcake on 2016/5/24.
 */
(function($){
    var resData = {
        "groups":[
            {
                "keys":"cheese1_png,cheese2_png,cheese3_png,combine_plus_png,dec_btn_png,exchange_btn_png,footer_bg_jpg,footer_cat_png,fun_qrcode_png,g_bg_jpg,grid_bg_png,hand_png,inc_btn_png,num_text_png,pd_item_border_png,pd_item_border_h_png,pd_window_title_png,pd-img_jpg,price_bg_png,price_bg_h_png,price_text_png,reserve_btn_png,show_anibanner_png,slogan_png,sub_text_png,arrow1_png,arrow2_png,base_bg2_png,bash_bg_png,center_bg_jpg,cheese_cat_png,cheese_mc_png,cheese_pic1_png,cheese_pic2_png,cheese_pic5_png,cheese_pic6_png,cheese_title_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"cheese1_png",
                "type":"image",
                "url":"cheese1.png"
            },
            {
                "name":"cheese2_png",
                "type":"image",
                "url":"cheese2.png"
            },
            {
                "name":"cheese3_png",
                "type":"image",
                "url":"cheese3.png"
            },
            {
                "name":"combine_plus_png",
                "type":"image",
                "url":"combine_plus.png"
            },
            {
                "name":"dec_btn_png",
                "type":"image",
                "url":"dec_btn.png"
            },
            {
                "name":"exchange_btn_png",
                "type":"image",
                "url":"exchange_btn.png"
            },
            {
                "name":"footer_bg_jpg",
                "type":"image",
                "url":"footer_bg.jpg"
            },
            {
                "name":"footer_cat_png",
                "type":"image",
                "url":"footer_cat.png"
            },
            {
                "name":"fun_qrcode_png",
                "type":"image",
                "url":"fun_qrcode.png"
            },
            {
                "name":"g_bg_jpg",
                "type":"image",
                "url":"g_bg.jpg"
            },
            {
                "name":"grid_bg_png",
                "type":"image",
                "url":"grid_bg.png"
            },
            {
                "name":"hand_png",
                "type":"image",
                "url":"hand.png"
            },
            {
                "name":"inc_btn_png",
                "type":"image",
                "url":"inc_btn.png"
            },
            {
                "name":"num_text_png",
                "type":"image",
                "url":"num_text.png"
            },
            {
                "name":"pd_item_border_png",
                "type":"image",
                "url":"pd_item_border.png"
            },
            {
                "name":"pd_item_border_h_png",
                "type":"image",
                "url":"pd_item_border_h.png"
            },
            {
                "name":"pd_window_title_png",
                "type":"image",
                "url":"pd_window_title.png"
            },
            {
                "name":"pd-img_jpg",
                "type":"image",
                "url":"pd-img.jpg"
            },
            {
                "name":"price_bg_png",
                "type":"image",
                "url":"price_bg.png"
            },
            {
                "name":"price_bg_h_png",
                "type":"image",
                "url":"price_bg_h.png"
            },
            {
                "name":"price_text_png",
                "type":"image",
                "url":"price_text.png"
            },
            {
                "name":"reserve_btn_png",
                "type":"image",
                "url":"reserve_btn.png"
            },
            {
                "name":"show_anibanner_png",
                "type":"image",
                "url":"show_anibanner.png"
            },
            {
                "name":"slogan_png",
                "type":"image",
                "url":"slogan.png"
            },
            {
                "name":"sub_text_png",
                "type":"image",
                "url":"sub_text.png"
            },
            {
                "name":"arrow1_png",
                "type":"image",
                "url":"arrow1.png"
            },
            {
                "name":"arrow2_png",
                "type":"image",
                "url":"arrow2.png"
            },
            {
                "name":"base_bg2_png",
                "type":"image",
                "url":"base_bg2.png"
            },
            {
                "name":"bash_bg_png",
                "type":"image",
                "url":"bash_bg.png"
            },
            {
                "name":"center_bg_jpg",
                "type":"image",
                "url":"center_bg.jpg"
            },
            {
                "name":"cheese_cat_png",
                "type":"image",
                "url":"cheese_cat.png"
            },
            {
                "name":"cheese_mc_png",
                "type":"image",
                "url":"cheese_mc.png"
            },
            {
                "name":"cheese_pic1_png",
                "type":"image",
                "url":"cheese_pic1.png"
            },
            {
                "name":"cheese_pic2_png",
                "type":"image",
                "url":"cheese_pic2.png"
            },
            {
                "name":"cheese_pic5_png",
                "type":"image",
                "url":"cheese_pic5.png"
            },
            {
                "name":"cheese_pic6_png",
                "type":"image",
                "url":"cheese_pic6.png"
            },
            {
                "name":"cheese_title_png",
                "type":"image",
                "url":"cheese_title.png"
            }]
    };

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

    var setQieMC = function(){
        var mc = new MovieClip(Resource.getRes('qie_dance_png'), qieMcData, 'qie', 'qie_dance');
        mc.gotoAndPlay(1, 1);
        mc.addEvent('complete', function(){
            mc.gotoAndStop(1);
        });
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

    var loadResource = function(){

        var loadComplete = function () {
            Resource.el('#evt_loading').style.display = "none";
            Resource.el('#evt_container').style.display = 'block';
            correctPNG($('#evt_container .evt_main').get(0));

            bindScroll('#scene_third');
            $("#plax_scene").parallax();
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