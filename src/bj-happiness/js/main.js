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
        floader:function(){
            var mc = new MovieClip('floader_png', "floader_json", 'el_floader');
            mc.gotoAndPlay(1, -1);
            return mc;
        },
        bdf:function(){
            var mc = new MovieClip('bdf_png', "bdf_json", 'el_bdf');
            mc.gotoAndPlay(1, -1);
            return mc;
        }
    };


    var loadComplete = function () {
        var winW = $(document).width();
        var clouderW = $('.cloud img').width();

        if (isSupportCss3) {
            /* alert("支持css3")
             css3animate();*/
        } else {
            /*alert("不支持")*/
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
        }



        animates.floader();
        animates.bdf();

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
            var spin = Resource.el('#evt_spin');

            loader.on("progress", function (loaded, total) {
                //spin.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";

            });

            loader.on("complete", function () {
                setTimeout(function () {

                    //$("#icon-2").fadeIn(500);
                    $('#evt_loading').fadeOut(500);
                    $('#evt_container').fadeIn(500);
                    correctPNG($('#evt_container').get(0));
                    bindScroll('#evt_container');
                    loadComplete();
                    // $("#evt_spin").addClass("fixed");
                }, 2000);
            });
        }

    };

    $(function () {
        loadResource();
    });

})(jQuery);