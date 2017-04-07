/**
 * Created by mcake on 2016/5/24.
 */
(function ($) {
    var clouder = function (opts) {
        this.className = $(opts.className);
        this.start = opts.start;
        this.end = opts.end;
        this.duration = opts.duration;
        this._init();
    }
    clouder.prototype = {
        _init: function () {
            var self = this;
            console.log(self.start)
            function reset() {
                self.className.css({
                    left: self.start
                });
            }
            function doAnimate() {
                self.className.animate(
                    {
                        left: self.end
                    }, {
                        duration: self.duration,
                        easing: 'linear',
                        complete: function () {
                            setTimeout(function () {
                                reset();
                                doAnimate();
                            }, 1000);
                        }
                    });
            }

            reset();
            setTimeout(doAnimate, 1000);
        }
    };

    var goodsAnimate = function (opts) {
        this.$className = $(opts.className);
        this.marginLeft = opts.marginLeft;
        this.marginTop = opts.marginTop;
        this._init();
    }
    goodsAnimate.prototype = {
        _init: function () {
            var self = this;
            self.$className.hover(function () {
                self.overEvent($(this));
            }, function () {
                self.outEvent($(this));
            });
        },
        overEvent: function (ele) {
            var self = this;
            ele.find(".cake").stop().animate({
                marginLeft: self.marginLeft
            }, 200);
            ele.find('.word').stop().animate({
                marginTop: '0',
                opacity: 1
            }, 300);
        },
        outEvent: function (ele) {
            var self = this;
            ele.find(".cake").stop().animate({
                marginLeft: '0'
            }, 200);
            ele.find('.word').stop().animate({
                marginTop: self.marginTop,
                opacity: 0
            }, 300);
        }
    };

    var animates = {

        bdf:function(){
            var mc = new MovieClip('bdf_png', "bdf_json", 'el_bdf');
            mc.gotoAndPlay(1, -1);
            return mc;
        }
    };
    function initTopIcon(){
        var icon = $('.floader');
            winWidth = $(window).width();
        /*icon.css('top', 395 * (winWidth<1280? 1280 : winWidth) / 1920);*/
        if(winWidth<1400){
            icon.css({'top':'40px','right':'0','position':'absolute'});
        }


    }

    function Floader(ele,start,end) {

        var $eles = $(ele);
        function reset(ele) {
            ele.animate({
                top: start
            });
        }
        function doAnimate(ele) {
            ele.animate(
                {
                    top: end
                }, {
                    duration: 1000, /*动画持续时间*/
                    easing: 'linear',
                    complete: function () {
                        setTimeout(function () {
                            reset($eles);
                            doAnimate($eles);
                        }, 100);  /*间隔时间*/
                    }
                });
        }

        reset($eles);
        setTimeout(doAnimate($eles), 100);
    };


    var loadComplete = function () {
        initTopIcon();
        animates.bdf();
        var winW = $(document).width();
        var clouderW = $('.cloud img').width();
        var floaderTop = $(".floader").offset().top;


        if (isSupportCss3) {
            /* alert("支持css3")*/
        } else {
            /*alert("不支持")*//*alert("不支持")*/

            new clouder({
                className: "#cloud-1",
                start: -clouderW,
                end: winW,
                duration: 20000
            });
            new clouder({
                className: "#cloud-2",
                start: winW,
                end: -clouderW,
                duration: 15000
            });


            new goodsAnimate({
                className: '.goods-1',
                marginLeft: "-8%",
                marginTop: '5%'
            });
            new goodsAnimate({
                className: '.goods-2',
                marginLeft: '8%',
                marginTop: '5%'
            });
            new goodsAnimate({
                className: '.goods-3',
                marginLeft: '-10%',
                marginTop: '5%'
            });

            Floader('.floader',floaderTop-10,floaderTop+10);
        }



    };


    var loadResource = function () {
        if (typeof resData == 'object' && Array.isArray(resData.resources) && resData.resources.length > 0) {
            startLoader(resData);
        } else {
            var resLoader = new Resource.JSONloader('res.json');
            resLoader.on("success", function (res) {
                startLoader(res);
            });
            resLoader.on("error", function () {
                console.error("资源配置加载失败...");
            });
        }

        function startLoader(data) {
            var loader = new Resource.loadGroup("preload", data);
            var spin = Resource.el('#spin');

            loader.on("progress", function (loaded, total) {
                spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";

            });

            loader.on("complete", function () {
                $('#evt_loading').fadeOut(100);
                $('#evt_container').fadeIn(800);
                correctPNG($('#evt_container').get(0));
                bindScroll('#evt_container');
                loadComplete();

            });
        }

    };

    $(function () {
        loadResource();
    });

})(jQuery);